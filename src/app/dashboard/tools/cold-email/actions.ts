"use server";

import { createClient } from "@/lib/supabase/server";
import { groq } from "@/lib/groq";

export type ColdEmailState = {
  status: "idle" | "success" | "error";
  message?: string;
  emails?: string[];
  companyContext?: string;
  targetPersona?: string;
  showInsufficientCreditsModal?: boolean;
};

const initialState: ColdEmailState = {
  status: "idle",
};

function buildPrompt(companyContext: string, targetPersona: string) {
  return [
    "You are an elite B2B outbound strategist and direct-response copywriter.",
    "Your task is to write highly personalized cold outreach emails that sound human, commercially sharp, and non-generic.",
    "Avoid robotic phrasing, clichés, fake flattery, and obvious AI language.",
    "Every email must feel distinct in angle, structure, and tone while still being professional and conversion-focused.",
    "Return EXACTLY valid JSON with this shape:",
    '{"emails":["email 1","email 2","email 3"]}',
    "Rules:",
    "- Output exactly 3 emails.",
    "- Each email should be distinct.",
    "- Each email should be concise but persuasive.",
    "- No markdown.",
    "- No extra keys.",
    "- No commentary before or after the JSON.",
    "- Use realistic personalization based on the supplied company context and persona.",
    "- Include a compelling opening, a clear value proposition, and a simple CTA.",
    "- Do not sound templated or mass-produced.",
    "",
    `Company Description / Website Context: ${companyContext}`,
    `Target Persona Profile: ${targetPersona}`,
  ].join("\n");
}

function safeString(value: FormDataEntryValue | null) {
  return value?.toString().trim() ?? "";
}

export async function generateColdEmails(
  previousState: ColdEmailState = initialState,
  formData: FormData,
): Promise<ColdEmailState> {
  void previousState;

  const companyContext = safeString(formData.get("companyContext"));
  const targetPersona = safeString(formData.get("targetPersona"));

  if (!companyContext || !targetPersona) {
    return {
      status: "error",
      message: "Please complete both fields before generating personalised emails.",
      companyContext,
      targetPersona,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "Your session has expired. Please log in again.",
      companyContext,
      targetPersona,
    };
  }

  const { data: creditData, error: creditError } = await supabase.rpc(
    "consume_user_credits",
    {
      u_id: user.id,
      token_cost: 2,
      tool_name: "cold-email",
    },
  );

  if (creditError || creditData !== true) {
    return {
      status: "error",
      message: "Insufficient Credits",
      companyContext,
      targetPersona,
      showInsufficientCreditsModal: true,
    };
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      temperature: 0.8,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You write high-converting B2B cold emails with strong specificity, natural tone, and zero generic AI phrasing.",
        },
        {
          role: "user",
          content: buildPrompt(companyContext, targetPersona),
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return {
        status: "error",
        message: "No email output was returned by Groq. Please try again.",
        companyContext,
        targetPersona,
      };
    }

    const parsed = JSON.parse(content) as { emails?: unknown };
    const emails = Array.isArray(parsed.emails)
      ? parsed.emails.filter((item): item is string => typeof item === "string").slice(0, 3)
      : [];

    if (emails.length !== 3) {
      return {
        status: "error",
        message: "The AI response did not return exactly 3 valid emails. Please try again.",
        companyContext,
        targetPersona,
      };
    }

    return {
      status: "success",
      message: "3 personalised email options generated successfully.",
      emails,
      companyContext,
      targetPersona,
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong while generating emails. Please try again.",
      companyContext,
      targetPersona,
    };
  }
}
