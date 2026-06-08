"use server";

import { createClient } from "@/lib/supabase/server";
import { groq } from "@/lib/groq";

export type SeoBriefState = {
  status: "idle" | "success" | "error";
  message?: string;
  brief?: string;
  seedKeyword?: string;
  vertical?: string;
  competitorDomain?: string;
  showInsufficientCreditsModal?: boolean;
};

const initialState: SeoBriefState = { status: "idle" };

function valueOf(field: FormDataEntryValue | null) {
  return field?.toString().trim() ?? "";
}

function createSeoPrompt(seedKeyword: string, vertical: string, competitorDomain: string) {
  return [
    "You are a world-class programmatic SEO strategist for B2B growth teams.",
    "Return a structured markdown brief only. No prose before or after the markdown.",
    "The brief must contain these exact sections in markdown:",
    "# Primary Content Silhouette",
    "# LSI Keyword Clusters",
    "# Competitor Content Deficiencies",
    "# Article Structural Outline",
    "# JSON Schema Layout Specs",
    "Requirements:",
    "- Be concrete, strategic, and non-generic.",
    "- Use SEO-specific language and realistic recommendations.",
    "- The structural outline must include exact H1, H2, H3, and H4 placements.",
    "- The JSON schema section must contain a fenced json block with a recommended schema layout.",
    "- Focus on building a scalable data-brief for programmatic SEO execution.",
    "",
    `Target Seed Keyword: ${seedKeyword}`,
    `Target Vertical / Industry: ${vertical}`,
    `Competitor Domain Root URL: ${competitorDomain}`,
  ].join("\n");
}

export async function generateSeoBrief(
  previousState: SeoBriefState = initialState,
  formData: FormData,
): Promise<SeoBriefState> {
  void previousState;

  const seedKeyword = valueOf(formData.get("seedKeyword"));
  const vertical = valueOf(formData.get("vertical"));
  const competitorDomain = valueOf(formData.get("competitorDomain"));

  if (!seedKeyword || !vertical || !competitorDomain) {
    return {
      status: "error",
      message: "Please complete all three SEO inputs before generating the brief.",
      seedKeyword,
      vertical,
      competitorDomain,
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
      seedKeyword,
      vertical,
      competitorDomain,
    };
  }

  const { data: creditData, error: creditError } = await supabase.rpc(
    "consume_user_credits",
    {
      u_id: user.id,
      token_cost: 5,
      tool_name: "seo-brief",
    },
  );

  if (creditError || creditData !== true) {
    return {
      status: "error",
      message: "Insufficient Credits",
      seedKeyword,
      vertical,
      competitorDomain,
      showInsufficientCreditsModal: true,
    };
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content:
            "You generate precise, structured programmatic SEO data-briefs in markdown with strong competitive analysis and implementation detail.",
        },
        {
          role: "user",
          content: createSeoPrompt(seedKeyword, vertical, competitorDomain),
        },
      ],
    });

    const brief = completion.choices[0]?.message?.content?.trim();

    if (!brief) {
      return {
        status: "error",
        message: "No SEO brief was returned by Groq. Please try again.",
        seedKeyword,
        vertical,
        competitorDomain,
      };
    }

    return {
      status: "success",
      message: "SEO brief generated successfully.",
      brief,
      seedKeyword,
      vertical,
      competitorDomain,
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong while generating the SEO brief. Please try again.",
      seedKeyword,
      vertical,
      competitorDomain,
    };
  }
}
