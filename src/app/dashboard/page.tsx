"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { toolsConfig } from "@/utils/toolsConfig";

const tabs = [
  { id: "all", label: "All Tools" },
  { id: "marketing", label: "Marketing" },
  { id: "dev", label: "Dev Utilities" },
  { id: "analytics", label: "Analytics" },
  { id: "legal", label: "Legal" },
  { id: "sales", label: "Sales" },
] as const;

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
    <div className="space-y-8">
      <section className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#090E17]/90 py-4 backdrop-blur-md">
        <div className="space-y-4 rounded-[2rem] border border-[#27272A] bg-[#09090B]/80 p-6 sm:p-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all 50 tools..."
              className="w-full rounded-2xl border border-[#27272A] bg-[#09090B] px-4 py-4 pl-12 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 " +
                    (isActive
                      ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                      : "border-[#27272A] bg-white/5 text-slate-300 hover:border-slate-700 hover:bg-white/10 hover:text-white")
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.id}
            href={"/dashboard/tools/" + tool.id}
            className="rounded-[1.75rem] border border-[#27272A] bg-[#09090B]/80 p-6 text-white hover:-translate-y-1 hover:border-slate-700 transition-all duration-200"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{tool.category}</p>
            <h3 className="mt-3 text-xl font-semibold">{tool.name}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">{tool.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
