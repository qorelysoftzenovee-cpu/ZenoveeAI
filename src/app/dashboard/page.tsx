"use client";

import Link from "next/link";
import { useState } from "react";

import { toolsConfig } from "@/utils/toolsConfig";

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const tabs = ["all", "marketing", "dev", "analytics", "legal", "sales"];

  const filteredTools = toolsConfig.filter((tool) => {
    const q = query.trim().toLowerCase();
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

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[#27272A] bg-[#09090B]/80 p-6 sm:p-8">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="🔍 Search all 50 tools..."
          className="w-full rounded-2xl border border-[#27272A] bg-[#09090B] px-4 py-4 text-sm text-white outline-none placeholder:text-slate-500"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={
                "rounded-full border px-4 py-2 text-sm " +
                (activeTab === tab
                  ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-100"
                  : "border-[#27272A] bg-white/5 text-slate-300")
              }
            >
              {tab === "all" ? "All Tools" : tab === "dev" ? "Dev Utilities" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.id}
            href={"/dashboard/tools/" + tool.id}
            className="rounded-[1.75rem] border border-[#27272A] bg-[#09090B]/80 p-6 text-white"
          >
            <p className="text-xs uppercase text-slate-500">{tool.category}</p>
            <h3 className="mt-3 text-xl font-semibold">{tool.name}</h3>
            <p className="mt-4 text-sm text-slate-400">{tool.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
