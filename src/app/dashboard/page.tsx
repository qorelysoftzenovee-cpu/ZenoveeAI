"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Terminal, ChevronRight, Zap } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";
import { TiltCard } from "@/components/ui/TiltCard";

const tabs = [
  { id: "all", label: "All Free Tools" },
  { id: "content", label: "Content Creation" },
  { id: "marketing", label: "Growth Marketing" },
  { id: "productivity", label: "Productivity Solvers" },
  { id: "financial", label: "Financial Calculators" },
  { id: "tech", label: "Data & Tech Utilities" },
] as const;

function getTabClass(tabId: string, isActive: boolean) {
  if (!isActive) {
    return "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900";
  }
  switch (tabId) {
    case "content":
      return "border-rose-300 bg-rose-50/80 text-rose-600 shadow-sm font-bold";
    case "marketing":
      return "border-amber-300 bg-amber-50/80 text-amber-600 shadow-sm font-bold";
    case "productivity":
      return "border-emerald-300 bg-emerald-50/80 text-emerald-600 shadow-sm font-bold";
    case "financial":
      return "border-purple-300 bg-purple-50/80 text-purple-600 shadow-sm font-bold";
    case "tech":
      return "border-indigo-300 bg-indigo-50/80 text-indigo-600 shadow-sm font-bold";
    default:
      return "border-slate-300 bg-slate-100 text-slate-800 shadow-sm font-bold";
  }
}

function getCategoryTheme(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("content")) {
    return {
      badge: "border-rose-100 bg-rose-50 text-rose-600",
      glow: "rgba(244, 63, 94, 0.02)",
      hoverBorder: "hover:border-rose-300/80",
      hoverText: "group-hover:text-rose-600",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(244,63,94,0.04)]",
      hoverIcon: "group-hover:text-rose-500",
    };
  }
  if (cat.includes("marketing")) {
    return {
      badge: "border-amber-100 bg-amber-50 text-amber-700",
      glow: "rgba(245, 158, 11, 0.02)",
      hoverBorder: "hover:border-amber-300/80",
      hoverText: "group-hover:text-amber-700",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.04)]",
      hoverIcon: "group-hover:text-amber-600",
    };
  }
  if (cat.includes("productivity")) {
    return {
      badge: "border-emerald-100 bg-emerald-50 text-emerald-600",
      glow: "rgba(16, 185, 129, 0.02)",
      hoverBorder: "hover:border-emerald-300/80",
      hoverText: "group-hover:text-emerald-600",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.04)]",
      hoverIcon: "group-hover:text-emerald-500",
    };
  }
  if (cat.includes("financial")) {
    return {
      badge: "border-purple-100 bg-purple-50 text-purple-650",
      glow: "rgba(168, 85, 247, 0.02)",
      hoverBorder: "hover:border-purple-300/80",
      hoverText: "group-hover:text-purple-600",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(168,85,247,0.04)]",
      hoverIcon: "group-hover:text-purple-500",
    };
  }
  return {
    badge: "border-indigo-100 bg-indigo-50 text-indigo-650",
    glow: "rgba(99, 102, 241, 0.02)",
    hoverBorder: "hover:border-indigo-300/80",
    hoverText: "group-hover:text-indigo-600",
    hoverShadow: "hover:shadow-[0_8px_30px_rgba(99,102,241,0.04)]",
    hoverIcon: "group-hover:text-indigo-500",
  };
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search) setQuery(search);
    if (category) setActiveTab(category);
  }, [searchParams]);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    return toolsConfig.filter((tool) => {
      const matchesQuery =
        q === "" ||
        tool.title.toLowerCase().includes(q) ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      const catLower = tool.category.toLowerCase();
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "content" && catLower.includes("content")) ||
        (activeTab === "marketing" && catLower.includes("marketing")) ||
        (activeTab === "productivity" && catLower.includes("productivity")) ||
        (activeTab === "financial" && catLower.includes("financial")) ||
        (activeTab === "tech" && (catLower.includes("tech") || catLower.includes("data")));

      return matchesQuery && matchesTab;
    });
  }, [activeTab, query]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Search Bar & Category Navigation */}
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-4.5 w-4.5 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 50+ free client-side tools (e.g. WebP, TikTok script, UTM builder, Base64)..."
            className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pl-12 pr-20 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${getTabClass(tab.id, isActive)}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of 50 Free Utilities */}
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
                  <span className={`inline-flex rounded-lg border px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase ${theme.badge}`}>
                    {tool.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100">
                    <Zap className="h-2.5 w-2.5" />
                    Free
                  </span>
                </div>

                <h3 className={`mt-4 text-base font-bold text-slate-900 transition-colors duration-200 tracking-tight flex items-center gap-1.5 ${theme.hoverText}`}>
                  {tool.title || tool.name}
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-0 group-hover:translate-x-0.5" />
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 font-sans">{tool.description}</p>
              </Link>
            </TiltCard>
          );
        })}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 text-xs uppercase tracking-wider font-mono">Loading tools...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
