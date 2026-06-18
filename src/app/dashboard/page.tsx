"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Terminal, ChevronRight } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";
import { TiltCard } from "@/components/ui/TiltCard";

const tabs = [
  { id: "all", label: "ALL COMMANDS" },
  { id: "marketing", label: "MARKETING" },
  { id: "dev", label: "DEV UTILITIES" },
  { id: "analytics", label: "ANALYTICS" },
  { id: "legal", label: "LEGAL" },
  { id: "sales", label: "SALES" },
] as const;

function getCategoryBadge(category: string) {
  if (category.includes("Marketing")) return "border border-teal-500/20 bg-teal-950/20 text-teal-400";
  if (category.includes("Legal")) return "border border-cyan-500/20 bg-cyan-950/20 text-cyan-400";
  if (category.includes("Financial")) return "border border-purple-500/20 bg-purple-950/20 text-purple-400";
  if (category.includes("Sales")) return "border border-amber-500/20 bg-amber-950/20 text-amber-400";
  return "border border-sky-500/20 bg-sky-950/20 text-sky-400";
}

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("all");

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    return toolsConfig.filter((tool) => {
      const matchesQuery =
        q === "" ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "marketing" && tool.category.includes("Marketing")) ||
        (activeTab === "dev" && tool.category.includes("Complex Data Processing")) ||
        (activeTab === "analytics" && tool.category.includes("Financial Intelligence")) ||
        (activeTab === "legal" && tool.category.includes("Legal")) ||
        (activeTab === "sales" && tool.category.includes("Sales Engineering"));

      return matchesQuery && matchesTab;
    });
  }, [activeTab, query]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Search Console */}
      <section className="rounded-[2rem] border border-[#1C2C55]/60 bg-[#0D1527]/50 p-6 shadow-lg shadow-black/25 sm:p-8 backdrop-blur-md">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-4.5 w-4.5 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Query system registry: enter keywords, categories, or tool IDs..."
            className="w-full rounded-2xl border border-[#1C2C55]/80 bg-[#080C14] pl-12 pr-20 py-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all font-mono"
          />
          <div className="absolute right-4 hidden items-center gap-1 sm:flex">
            <kbd className="rounded-md border border-[#1C2C55] bg-[#0D1527] px-1.5 py-0.5 text-[10px] font-mono text-slate-500">Ctrl</kbd>
            <kbd className="rounded-md border border-[#1C2C55] bg-[#0D1527] px-1.5 py-0.5 text-[10px] font-mono text-slate-500">K</kbd>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  "rounded-xl border px-4 py-2 text-xs font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer " +
                  (isActive
                    ? "border-teal-500/30 bg-[#0D1527] text-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.12)]"
                    : "border-transparent bg-[#080C14]/40 text-slate-400 hover:bg-[#0D1527]/50 hover:text-slate-200 hover:border-[#1C2C55]/60")
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of commands */}
      <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <TiltCard
            key={tool.id}
            glowColor="rgba(20, 184, 166, 0.08)"
            className="rounded-[1.75rem] border border-[#1C2C55]/50 bg-[#0D1527]/40 shadow-lg hover:border-teal-500/40 hover:shadow-[0_0_25px_rgba(20,184,166,0.08)] transition-all duration-300"
          >
            <Link
              href={"/dashboard/tools/" + tool.id}
              className="block p-6 text-slate-200 group"
            >
              <div className="flex items-center justify-between">
                <span className={"inline-flex rounded-lg px-2.5 py-1 text-[9px] font-bold font-mono tracking-widest uppercase " + getCategoryBadge(tool.category)}>
                  {tool.category.split(" & ")[0]}
                </span>
                <Terminal className="h-3.5 w-3.5 text-slate-600 group-hover:text-teal-400 transition-colors" />
              </div>

              <h3 className="mt-4 text-base font-bold font-mono text-slate-100 group-hover:text-teal-400 transition-colors uppercase tracking-tight flex items-center gap-1.5">
                {tool.name}
                <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-0 group-hover:translate-x-0.5" />
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-slate-400 font-sans">{tool.description}</p>
            </Link>
          </TiltCard>
        ))}
      </section>
    </div>
  );
}
