import "server-only";

import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { toolsConfig } from "@/utils/toolsConfig";
import Groq from "groq-sdk";

const UNIVERSAL_EXECUTION_RULE =
  "CRITICAL SYSTEM RULE: You are an elite enterprise B2B consultant. Do not summarize, use shortcuts, or write basic text blocks. Your output must be deeply granular, highly analytical, and written at a professional, executive tier. Break your response down into extensive operational sections using clean Markdown subheadings, itemized execution tables, absolute programmatic parameters, and comprehensive strategic blueprints.";

type ProcessToolRequest = {
  toolId: string;
  tokenCost: number;
  inputs: {
    [key: string]: string | undefined;
  };
};

function buildUserPrompt(
  inputs: Record<string, string | undefined>,
) {
  const normalizedEntries = Object.entries(inputs)
    .map(([key, value]) => [key, value?.trim() ?? ""] as const)
    .filter(([, value]) => value.length > 0);

  const serializedInputs = normalizedEntries
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  return [
    "User Inputs:",
    serializedInputs,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  let payload: ProcessToolRequest;

  try {
    payload = (await request.json()) as ProcessToolRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { toolId, tokenCost, inputs } = payload;
  const toolConfig = toolsConfig.find((tool) => tool.id === toolId);

  if (!toolId || !tokenCost || !inputs || !toolConfig) {
    return NextResponse.json(
      { error: "toolId, tokenCost, inputs, and a valid tool configuration are required." },
      { status: 400 },
    );
  }

  if (tokenCost !== toolConfig.cost) {
    return NextResponse.json(
      { error: "Token cost does not match the registered tool configuration." },
      { status: 400 },
    );
  }

  const missingFields = toolConfig.inputs.filter((field) => {
    const value = inputs[field.id]?.trim() ?? "";
    return value.length === 0;
  });

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required input: ${missingFields[0]?.label ?? "Unknown field"}` },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: currentProfile, error: profileError } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json({ error: "Unable to load your profile." }, { status: 500 });
  }

  const activeTier = currentProfile?.tier as "free" | "pro" | "agency" | "trial" | null;

  if (activeTier === "trial") {
    const { data: existingUsage, error: usageCheckError } = await supabase
      .from("user_tool_usage")
      .select("id")
      .eq("user_id", user.id)
      .eq("tool_id", toolId)
      .maybeSingle();

    if (usageCheckError) {
      return NextResponse.json(
        { error: "Unable to validate your launch trial usage right now." },
        { status: 500 },
      );
    }

    if (existingUsage) {
      return NextResponse.json(
        {
          error:
            "Launch Trial Limit Exhausted for this tool. Upgrade to Pro for unlimited monthly generations.",
        },
        { status: 403 },
      );
    }
  }

  if (activeTier !== "trial") {
    const { data: creditData, error: creditError } = await supabase.rpc(
      "consume_user_credits",
      {
        u_id: user.id,
        token_cost: tokenCost,
        tool_name: toolId,
      },
    );

    if (creditError) {
      return NextResponse.json(
        { error: "Unable to validate credits at this time." },
        { status: 500 },
      );
    }

    if (creditData !== true) {
      return NextResponse.json({ error: "Insufficient Credits" }, { status: 402 });
    }
  }

  try {
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: groqApiKey });

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `${toolConfig.systemPrompt}\n\n${UNIVERSAL_EXECUTION_RULE}`,
        },
        {
          role: "user",
          content: buildUserPrompt(inputs),
        },
      ],
    });

    const output = completion.choices[0]?.message?.content?.trim();

    if (!output) {
      return NextResponse.json(
        { error: "Empty response from Groq" },
        { status: 500 },
      );
    }

    await supabase.from("generation_history").insert({
      user_id: user.id,
      tool_id: toolId,
      input_data: inputs,
      output_text: output,
    });

    if (activeTier === "trial") {
      const { error: usageInsertError } = await supabase.from("user_tool_usage").insert({
        user_id: user.id,
        tool_id: toolId,
      });

      if (usageInsertError) {
        return NextResponse.json(
          { error: "Unable to record launch trial usage." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ toolId, output });
  } catch {
    return NextResponse.json(
      { error: "Tool execution failed. Please try again." },
      { status: 500 },
    );
  }
}
