import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileSearch, Landmark, Megaphone, Scale } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

const categoryPresentation = {
  "Marketing & SEO": {
    title: "Marketing",
    description:
      "Campaign execution, SEO intelligence, content scaling, positioning, and growth systems for modern B2B teams.",
    icon: Megaphone,
  },
  "Legal, Compliance & Institutional HR": {
    title: "Legal",
    description:
      "Structured contract review, policy analysis, governance support, and compliance interpretation across sensitive workflows.",
    icon: Scale,
  },
  "Financial Intelligence, Modeling & Operational Analysis": {
    title: "Finance",
    description:
      "Scenario planning, unit economics, retention metrics, pricing analysis, valuation sensitivity, and decision-grade finance tooling.",
    icon: Landmark,
  },
  "Sales Engineering & Strategy": {
    title: "Sales",
    description:
      "Deal support, objection handling, qualification systems, discovery planning, procurement prediction, and enterprise account strategy.",
    icon: BriefcaseBusiness,
  },
  "Complex Data Processing & Technical Management": {
    title: "Data",
    description:
      "Technical diagnostics, schema utilities, architecture visualization, migration review, and high-signal processing workflows.",
    icon: FileSearch,
  },
} as const;

const groupedTools = Object.entries(categoryPresentation).map(([categoryKey, meta]) => ({
  ...meta,
  categoryKey,
  tools: toolsConfig.filter((tool) => tool.category === categoryKey),
}));

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Suite Workspace
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Navigate your complete premium B2B tool matrix
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              Launch any registered tool instantly through a unified catalog that groups your operational stack by business domain, execution intensity, and live credit cost.
            </p>
          </div>

          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            {toolsConfig.length} tools available
          </div>
        </div>
      </section>

      {groupedTools.map((group) => {
        const Icon = group.icon;

        return (
          <section
            key={group.categoryKey}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                    {group.title}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{group.categoryKey}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                {group.tools.length} tools
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {group.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/dashboard/tools/${tool.id}`}
                  className="group rounded-[1.75rem] border border-white/10 bg-[#101522] p-6 transition hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-950/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80">
                        Live Tool
                      </p>
                      <h4 className="mt-3 text-xl font-semibold text-white">{tool.name}</h4>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                      {tool.cost} Credits
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-300">{tool.description}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-medium text-cyan-200">
                    <span>Open tool workspace</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
