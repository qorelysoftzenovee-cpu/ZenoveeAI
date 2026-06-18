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

function getTabClass(tabId: string, isActive: boolean) {
  if (!isActive) {
    return "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800";
  }
  switch (tabId) {
    case "marketing":
      return "border-rose-300 bg-rose-50/70 text-rose-600 shadow-[0_2px_8px_rgba(244,63,94,0.03)]";
    case "dev":
      return "border-indigo-300 bg-indigo-50/70 text-indigo-650 shadow-[0_2px_8px_rgba(99,102,241,0.03)]";
    case "analytics":
      return "border-amber-300 bg-amber-50/70 text-amber-700 shadow-[0_2px_8px_rgba(245,158,11,0.03)]";
    case "legal":
      return "border-purple-300 bg-purple-50/70 text-purple-600 shadow-[0_2px_8px_rgba(168,85,247,0.03)]";
    case "sales":
      return "border-orange-300 bg-orange-50/70 text-orange-655 shadow-[0_2px_8px_rgba(249,115,22,0.03)]";
    default:
      return "border-slate-300 bg-slate-50 text-slate-700 shadow-sm";
  }
}

function getCategoryTheme(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("marketing")) {
    return {
      badge: "border-rose-100 bg-rose-50 text-rose-600",
      glow: "rgba(244, 63, 94, 0.02)",
      hoverBorder: "hover:border-rose-300/80",
      hoverText: "group-hover:text-rose-600",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(244,63,94,0.03)]",
      hoverIcon: "group-hover:text-rose-500",
    };
  }
  if (cat.includes("legal")) {
    return {
      badge: "border-purple-100 bg-purple-50 text-purple-650",
      glow: "rgba(168, 85, 247, 0.02)",
      hoverBorder: "hover:border-purple-300/80",
      hoverText: "group-hover:text-purple-600",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(168,85,247,0.03)]",
      hoverIcon: "group-hover:text-purple-500",
    };
  }
  if (cat.includes("financial") || cat.includes("sales engineering")) {
    if (cat.includes("sales")) {
      return {
        badge: "border-orange-100 bg-orange-50 text-orange-650",
        glow: "rgba(249, 115, 22, 0.02)",
        hoverBorder: "hover:border-orange-300/80",
        hoverText: "group-hover:text-orange-600",
        hoverShadow: "hover:shadow-[0_8px_30px_rgba(249,115,22,0.03)]",
        hoverIcon: "group-hover:text-orange-500",
      };
    }
    return {
      badge: "border-amber-100 bg-amber-50 text-amber-700",
      glow: "rgba(245, 158, 11, 0.02)",
      hoverBorder: "hover:border-amber-300/80",
      hoverText: "group-hover:text-amber-700",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.03)]",
      hoverIcon: "group-hover:text-amber-600",
    };
  }
  if (cat.includes("sales")) {
    return {
      badge: "border-orange-100 bg-orange-50 text-orange-650",
      glow: "rgba(249, 115, 22, 0.02)",
      hoverBorder: "hover:border-orange-300/80",
      hoverText: "group-hover:text-orange-600",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(249,115,22,0.03)]",
      hoverIcon: "group-hover:text-orange-500",
    };
  }
  // Default is Dev/Complex Data Processing
  return {
    badge: "border-indigo-100 bg-indigo-50 text-indigo-650",
    glow: "rgba(99, 102, 241, 0.02)",
    hoverBorder: "hover:border-indigo-300/80",
    hoverText: "group-hover:text-indigo-600",
    hoverShadow: "hover:shadow-[0_8px_30px_rgba(99,102,241,0.03)]",
    hoverIcon: "group-hover:text-indigo-500",
  };
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
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-4.5 w-4.5 text-slate-450" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Query system registry: enter keywords, categories, or tool IDs..."
            className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pl-12 pr-20 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/25 transition-all font-mono shadow-inner"
          />
          <div className="absolute right-4 hidden items-center gap-1 sm:flex">
            <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">Ctrl</kbd>
            <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">K</kbd>
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
                className={`rounded-xl border px-4 py-2 text-xs font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer ${getTabClass(tab.id, isActive)}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of commands */}
      <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {filteredTools.map((tool) => {
          const theme = getCategoryTheme(tool.category);
          return (
            <TiltCard
              key={tool.id}
              glowColor={theme.glow}
              className={`rounded-[1.75rem] border border-slate-150/85 bg-white shadow-sm transition-all duration-300 ${theme.hoverBorder} ${theme.hoverShadow}`}
            >
              <Link
                href={"/dashboard/tools/" + tool.id}
                className="block p-6 text-slate-800 group"
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex rounded-lg border px-2.5 py-1 text-[9px] font-bold font-mono tracking-widest uppercase ${theme.badge}`}>
                    {tool.category.split(" & ")[0]}
                  </span>
                  <Terminal className={`h-3.5 w-3.5 text-slate-400 transition-colors duration-200 ${theme.hoverIcon}`} />
                </div>

                <h3 className={`mt-4 text-base font-bold font-mono text-slate-900 transition-colors duration-200 uppercase tracking-tight flex items-center gap-1.5 ${theme.hoverText}`}>
                  {tool.name}
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-0 group-hover:translate-x-0.5" />
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-slate-500 font-sans">{tool.description}</p>
              </Link>
            </TiltCard>
          );
        })}
      </section>
    </div>
  );
}
