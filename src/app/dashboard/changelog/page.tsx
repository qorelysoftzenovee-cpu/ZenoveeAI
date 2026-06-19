"use client";

import { Megaphone, Wrench, Sparkles, Shield, Bug, Zap } from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: "feature" | "improvement" | "fix" | "security";
  items: string[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.4.0",
    date: "June 2026",
    title: "Workbench Pipeline & Preset System",
    type: "feature",
    items: [
      "Added visual execution pipeline topology (INPUT_DECK → COMPILE_CORE → STDOUT)",
      "Introduced Preset Config Loader with realistic sample data per tool category",
      "Multi-tab workbench with Raw Markdown, JSON Schema, and Blueprint views",
      "Quality & Risk Audit simulation for output compliance checking",
      "Deploy Payload Webhook interface for exporting AI outputs",
    ],
  },
  {
    version: "1.3.0",
    date: "June 2026",
    title: "Premium Light Theme & Sidebar Overhaul",
    type: "improvement",
    items: [
      "Migrated from dark to premium light pastel theme across all dashboard views",
      "Sidebar redesigned with frosted glass, operator access card, and telemetry widget",
      "Environment posture indicator added to sidebar header",
      "Token (credits) progress bar with gradient visualization",
      "Category-specific color theming for tool cards and badges",
    ],
  },
  {
    version: "1.2.0",
    date: "June 2026",
    title: "SEO & Marketing Pages",
    type: "feature",
    items: [
      "Built landing page with conversion-focused hero, feature grid, and pricing section",
      "About page with team positioning and mission statement",
      "Privacy Policy and Terms of Service pages added",
      "Full SEO metadata across all public routes",
    ],
  },
  {
    version: "1.1.0",
    date: "June 2026",
    title: "AI Tool Engine & Credit System",
    type: "feature",
    items: [
      "Integrated OpenAI-compatible API for all 10+ tool categories",
      "Credit-based billing system with free trial tier (3 uses per tool)",
      "Pro and Enterprise pricing tiers via Stripe checkout",
      "Generation history saved to Supabase for future reference",
      "Admin panel with user management and credit allocation",
    ],
  },
  {
    version: "1.0.1",
    date: "June 2026",
    title: "Bug Fixes & Stability",
    type: "fix",
    items: [
      "Fixed TypeScript strict mode errors in tool runner component",
      "Resolved edge-case where empty inputs caused 500 API errors",
      "Corrected credit deduction race condition with service-role key",
    ],
  },
  {
    version: "1.0.0",
    date: "June 2026",
    title: "Initial Platform Launch",
    type: "feature",
    items: [
      "Zenovee AI platform with Supabase authentication (email/password, Google OAuth)",
      "Dashboard with categorized tool grid and search functionality",
      "10 enterprise-grade AI tools across Marketing, Legal, Sales, Analytics, and Dev categories",
      "TiltCard hover effects and micro-animation system",
    ],
  },
];

function getTypeConfig(type: ChangelogEntry["type"]) {
  switch (type) {
    case "feature":
      return {
        icon: Sparkles,
        label: "New Feature",
        bg: "bg-indigo-50",
        border: "border-indigo-200/60",
        text: "text-indigo-600",
        dot: "bg-indigo-400",
        ringColor: "ring-indigo-50",
      };
    case "improvement":
      return {
        icon: Zap,
        label: "Improvement",
        bg: "bg-teal-50",
        border: "border-teal-200/60",
        text: "text-teal-600",
        dot: "bg-teal-400",
        ringColor: "ring-teal-50",
      };
    case "fix":
      return {
        icon: Bug,
        label: "Bug Fix",
        bg: "bg-amber-50",
        border: "border-amber-200/60",
        text: "text-amber-700",
        dot: "bg-amber-400",
        ringColor: "ring-amber-50",
      };
    case "security":
      return {
        icon: Shield,
        label: "Security",
        bg: "bg-rose-50",
        border: "border-rose-200/60",
        text: "text-rose-600",
        dot: "bg-rose-400",
        ringColor: "ring-rose-50",
      };
  }
}

export default function ChangelogPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-2.5 text-violet-600">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-mono text-slate-900 uppercase tracking-tight">
              Changelog
            </h2>
            <p className="text-xs text-slate-500">
              Platform version history, feature releases, and improvements
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-slate-200 via-slate-150 to-transparent" />

        <div className="space-y-6">
          {changelog.map((entry, idx) => {
            const config = getTypeConfig(entry.type);
            const Icon = config.icon;

            return (
              <div
                key={entry.version}
                className="relative pl-12"
                style={{
                  animationDelay: `${idx * 60}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-2.5 top-6 w-3.5 h-3.5 rounded-full ${config.dot} ring-4 ${config.ringColor} shadow-sm z-10`}
                />

                <div className="rounded-2xl border border-slate-150/85 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold font-mono text-slate-600 tracking-wider">
                      v{entry.version}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[9px] font-bold font-mono tracking-widest uppercase ${config.bg} ${config.border} ${config.text}`}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 ml-auto">
                      {entry.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-tight">
                    {entry.title}
                  </h3>

                  <ul className="mt-3 space-y-2">
                    {entry.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed font-sans"
                      >
                        <Wrench className="h-3 w-3 mt-0.5 text-slate-350 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
