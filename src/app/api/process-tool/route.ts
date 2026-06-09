import "server-only";

import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { toolsConfig } from "@/utils/toolsConfig";
import Groq from "groq-sdk";

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
          content: toolConfig.systemPrompt,
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

    return NextResponse.json({ toolId, output });
  } catch {
    return NextResponse.json(
      { error: "Tool execution failed. Please try again." },
      { status: 500 },
    );
  }
}
