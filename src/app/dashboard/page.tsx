import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileText, Megaphone, ShieldCheck } from "lucide-react";

const featuredTools = [
  {
    name: "Hyper-Targeted Cold Outreach Personalizer",
    description:
      "Generate sharper, conversion-ready cold outreach variants tailored to a target company context and decision-maker profile.",
    cost: 2,
    href: "/dashboard/tools/cold-email",
    badge: "Live Tool",
  },
  {
    name: "Programmatic SEO Data-Brief Generator",
    description:
      "Create structured SEO data-briefs with content silhouettes, LSI keyword clusters, competitive gaps, and article outlines.",
    cost: 5,
    href: "/dashboard/tools/seo-brief",
    badge: "Live Tool",
  },
];

const platformDomains = [
  {
    title: "Category A: Marketing & SEO Automation",
    icon: Megaphone,
    description:
      "Campaign execution, search growth systems, and go-to-market acceleration tools for modern B2B teams.",
    cards: [
      {
        title: "Competitive SERP Mapper",
        text: "Map search intent, ranking weaknesses, and topical opportunities across priority commercial queries.",
      },
      {
        title: "Content Repurposing Planner",
        text: "Convert one strategic idea into multi-channel assets for blogs, email, video, and sales enablement.",
      },
    ],
  },
  {
    title: "Category B: Legal & Compliance",
    icon: ShieldCheck,
    description:
      "Future modules for policy drafting, compliance summarization, and business risk review workflows.",
    cards: [
      {
        title: "Contract Risk Snapshot",
        text: "Planned review assistant for identifying risky clauses, renewal traps, and missing obligations.",
      },
      {
        title: "Policy Summary Generator",
        text: "Upcoming tool for creating simple, executive-friendly summaries of complex legal and internal policy documents.",
      },
    ],
  },
  {
    title: "Category C: Sales & Revenue Intelligence",
    icon: BriefcaseBusiness,
    description:
      "Pipeline acceleration, outbound intelligence, and offer-positioning tools built for premium deal flow.",
    cards: [
      {
        title: "Deal Objection Analyzer",
        text: "Future support tool for spotting hidden objections and improving proposal and follow-up strategy.",
      },
      {
        title: "Executive Value Framing Builder",
        text: "Planned assistant for repositioning service offerings into clearer commercial value narratives.",
      },
    ],
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Tool catalog
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Launch the first premium tools in your internal suite
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
              Start with your two live flagship tools, then expand into a broader ecosystem of automation, compliance, intelligence, and productivity modules.
            </p>
          </div>
          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            2 live tools available
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {featuredTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group rounded-[1.75rem] border border-white/10 bg-[#08101f] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-2xl hover:shadow-cyan-950/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                    {tool.badge}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{tool.name}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">
                  Cost: {tool.cost} Credits
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-white/65">{tool.description}</p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-medium text-cyan-200">
                <span>Open tool workspace</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {platformDomains.map((domain) => {
          const Icon = domain.icon;

          return (
            <article
              key={domain.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#08101f] p-3 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{domain.title}</h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-white/65">{domain.description}</p>

              <div className="mt-6 space-y-4">
                {domain.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[1.5rem] border border-white/10 bg-[#08101f] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-white/60">{card.text}</p>
                      </div>
                      <FileText className="mt-1 h-4 w-4 shrink-0 text-white/30" />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
