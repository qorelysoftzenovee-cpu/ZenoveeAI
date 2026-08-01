"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronRight, Sparkles, LayoutGrid } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  // Get all unique categories dynamically
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(toolsConfig.map((t) => t.category)));
  }, []);

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
        tool.category.toLowerCase().includes(q) ||
        tool.id.toLowerCase().includes(q);

      const matchesTab =
        activeTab === "all" ||
        tool.category === activeTab ||
        tool.category.toLowerCase().includes(activeTab.toLowerCase());

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
            placeholder={`Search across all ${toolsConfig.length}+ calculations, formatters, generators, or converters...`}
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

        {/* Dynamic Category Pill Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-xl border px-3.5 py-2 text-xs transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
              activeTab === "all"
                ? "border-slate-800 bg-slate-900 text-white shadow-sm font-extrabold"
                : "border-slate-200 bg-white text-slate-650 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            All Utilities ({toolsConfig.length})
          </button>

          {uniqueCategories.map((catName) => {
            const count = toolsConfig.filter((t) => t.category === catName).length;
            const isActive = activeTab === catName;
            return (
              <button
                key={catName}
                type="button"
                onClick={() => setActiveTab(catName)}
                className={`rounded-xl border px-3 py-2 text-xs transition-all font-bold cursor-pointer ${
                  isActive
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm font-extrabold"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {catName} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Directory Grid Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Available Client-Side Utilities</span>
            <span className="text-xs font-bold bg-indigo-50 text-indigo-650 border border-indigo-100 px-2.5 py-1 rounded-full">
              {filteredTools.length} {filteredTools.length === 1 ? "Tool" : "Tools"}
            </span>
          </h2>
        </div>

        {filteredTools.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Matching Tools Found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any utility matching &quot;{query}&quot; in the selected category.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveTab("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/dashboard/tools/${tool.id}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center rounded-lg border border-indigo-100 bg-indigo-50/80 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                      {tool.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {tool.inputs.length} {tool.inputs.length === 1 ? "input" : "inputs"}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-650 transition-colors line-clamp-1">
                    {tool.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-indigo-600">
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Launch Utility
                  </span>
                  <ChevronRight className="h-4 w-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
            <Sparkles className="h-5 w-5 animate-spin text-indigo-600" />
            Loading Utilities Directory...
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
