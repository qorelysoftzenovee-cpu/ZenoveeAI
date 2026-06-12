"use client";

import Link from "next/link";
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

function getCategoryBadge(category: string) {
  if (category.includes("Marketing")) return "bg-[#E6F4EA] text-[#137333]";
  if (category.includes("Legal")) return "bg-[#E8F0FE] text-[#1A73E8]";
  if (category.includes("Financial")) return "bg-[#F3E8FF] text-[#6B21A8]";
  if (category.includes("Sales")) return "bg-[#FFEFE7] text-[#C0392B]";
  return "bg-[#E2FBF7] text-[#007A78]";
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
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] sm:p-8">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search all 50 tools..."
          className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-4 text-sm text-[#1E293B] outline-none placeholder:text-[#64748B]"
        />
        <div className="mt-4 flex flex-wrap gap-3">
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
                    ? "border-slate-300 bg-slate-100 text-[#1E293B] shadow-sm"
                    : "border-slate-200 bg-white text-[#64748B] hover:bg-slate-50 hover:text-[#1E293B]")
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.id}
            href={"/dashboard/tools/" + tool.id}
            className="rounded-[1.75rem] border border-slate-100 bg-white p-6 text-[#1E293B] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-200"
          >
            <span className={"inline-flex rounded-full px-3 py-1 text-xs font-semibold " + getCategoryBadge(tool.category)}>
              {tool.category}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-[#1E293B]">{tool.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[#64748B]">{tool.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
