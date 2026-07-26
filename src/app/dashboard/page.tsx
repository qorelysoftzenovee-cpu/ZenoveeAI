"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronRight, Sparkles } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

const tabs = [
  { id: "all", label: "All Utilities" },
  { id: "content", label: "Content Creation" },
  { id: "marketing", label: "Growth Marketing" },
  { id: "productivity", label: "Productivity Solvers" },
  { id: "financial", label: "Financial Calculators" },
  { id: "tech", label: "Data & Tech Utilities" },
] as const;

function getTabClass(tabId: string, isActive: boolean) {
  if (!isActive) {
    return "border-slate-200 bg-white text-slate-650 hover:bg-slate-50 hover:text-slate-900";
  }
  switch (tabId) {
    case "content":
      return "border-rose-350 bg-rose-50/90 text-rose-600 shadow-sm font-extrabold";
    case "marketing":
      return "border-amber-350 bg-amber-50/90 text-amber-700 shadow-sm font-extrabold";
    case "productivity":
      return "border-emerald-350 bg-emerald-50/90 text-emerald-650 shadow-sm font-extrabold";
    case "financial":
      return "border-purple-350 bg-purple-50/90 text-purple-650 shadow-sm font-extrabold";
    case "tech":
      return "border-indigo-350 bg-indigo-50/90 text-indigo-650 shadow-sm font-extrabold";
    default:
      return "border-slate-400 bg-slate-100 text-slate-900 shadow-sm font-extrabold";
  }
}

function getCategoryTheme(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("content")) {
    return {
      badge: "border-rose-100 bg-rose-50 text-rose-600",
      borderHover: "hover:border-rose-300 hover:shadow-rose-500/5",
      textHover: "group-hover:text-rose-650",
    };
  }
  if (cat.includes("marketing")) {
    return {
      badge: "border-amber-100 bg-amber-50 text-amber-700",
      borderHover: "hover:border-amber-300 hover:shadow-amber-500/5",
      textHover: "group-hover:text-amber-750",
    };
  }
  if (cat.includes("productivity")) {
    return {
      badge: "border-emerald-100 bg-emerald-50 text-emerald-650",
      borderHover: "hover:border-emerald-300 hover:shadow-emerald-500/5",
      textHover: "group-hover:text-emerald-700",
    };
  }
  if (cat.includes("financial")) {
    return {
      badge: "border-purple-100 bg-purple-50 text-purple-650",
      borderHover: "hover:border-purple-300 hover:shadow-purple-500/5",
      textHover: "group-hover:text-purple-700",
    };
  }
  return {
    badge: "border-indigo-100 bg-indigo-50 text-indigo-650",
    borderHover: "hover:border-indigo-300 hover:shadow-indigo-500/5",
    textHover: "group-hover:text-indigo-700",
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
    <div className="space-y-8 animate-fade-in-up font-sans">
      {/* Search Bar & Category Navigation */}
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="relative flex items-center">
          <Search className="absolute left-4.5 h-5 w-5 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search calculations, scripts, dynamic formatters, or file converters..."
            className="w-full rounded-2xl border border-slate-250 bg-[#F8FAFC] pl-14 pr-20 py-4.5 text-base text-slate-900 outline-none placeholder:text-slate-400 font-semibold focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${getTabClass(tab.id, isActive)}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of 50 Utilities with Premium Card Design */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => {
          const theme = getCategoryTheme(tool.category);
          return (
            <div
              key={tool.id}
              className={`group relative rounded-[2rem] border border-slate-200/80 bg-white p-6.5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-slate-50/30 transition-all duration-300 cursor-pointer flex flex-col justify-between ${theme.borderHover}`}
            >
              <Link href={"/dashboard/tools/" + tool.id} className="block flex-1">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex rounded-xl border px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase ${theme.badge}`}>
                    {tool.category}
                  </span>
                  <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-2 text-slate-400 group-hover:text-indigo-650 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all shadow-sm">
                    <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
                  </div>
                </div>

                <h3 className={`mt-5 text-lg font-extrabold text-slate-905 transition-colors duration-200 tracking-tight flex items-center gap-1.5 ${theme.textHover}`}>
                  <span>{tool.title || tool.name}</span>
                  <ChevronRight className="h-4.5 w-4.5 opacity-0 group-hover:opacity-100 transition-all duration-350 transform translate-x-[-4px] group-hover:translate-x-0" />
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium font-sans">
                  {tool.description}
                </p>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-450 text-sm uppercase tracking-wider font-bold">Loading Zenovee Suite...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
