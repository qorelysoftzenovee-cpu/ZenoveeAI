"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  Clock,
  Terminal,
  ChevronRight,
  Loader2,
  SearchX,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { toolsConfig } from "@/utils/toolsConfig";

interface HistoryEntry {
  id: string;
  tool_id: string;
  input_data: Record<string, string> | null;
  output_text: string | null;
  created_at: string;
}

function getToolMeta(toolId: string) {
  const tool = toolsConfig.find((t) => t.id === toolId);
  return tool
    ? { name: tool.name, category: tool.category }
    : { name: toolId, category: "Unknown" };
}

function getCategoryColor(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("marketing"))
    return {
      bg: "bg-rose-50",
      border: "border-rose-200/60",
      text: "text-rose-600",
      dot: "bg-rose-400",
    };
  if (cat.includes("legal"))
    return {
      bg: "bg-violet-50",
      border: "border-violet-200/60",
      text: "text-violet-600",
      dot: "bg-violet-400",
    };
  if (cat.includes("sales"))
    return {
      bg: "bg-orange-50",
      border: "border-orange-200/60",
      text: "text-orange-600",
      dot: "bg-orange-400",
    };
  if (cat.includes("financial"))
    return {
      bg: "bg-amber-50",
      border: "border-amber-200/60",
      text: "text-amber-700",
      dot: "bg-amber-400",
    };
  return {
    bg: "bg-indigo-50",
    border: "border-indigo-200/60",
    text: "text-indigo-600",
    dot: "bg-indigo-400",
  };
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTool, setFilterTool] = useState<string>("all");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("generation_history")
        .select("id, tool_id, input_data, output_text, created_at")
        .order("created_at", { ascending: false })
        .limit(100);

      setEntries((data as HistoryEntry[] | null) ?? []);
      setLoading(false);
    }
    void load();
  }, []);

  const usedTools = useMemo(() => {
    const ids = new Set(entries.map((e) => e.tool_id));
    return Array.from(ids).map((id) => ({
      id,
      name: getToolMeta(id).name,
    }));
  }, [entries]);

  const filtered = useMemo(
    () =>
      filterTool === "all"
        ? entries
        : entries.filter((e) => e.tool_id === filterTool),
    [entries, filterTool]
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-2.5 text-teal-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-mono text-slate-900 uppercase tracking-tight">
              Usage History
            </h2>
            <p className="text-xs text-slate-500">
              Timeline of all past AI tool executions across your workspace
            </p>
          </div>
        </div>

        {/* Tool filter chips */}
        {usedTools.length > 1 && (
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterTool("all")}
              className={`rounded-xl border px-3.5 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filterTool === "all"
                  ? "border-slate-300 bg-slate-50 text-slate-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              All ({entries.length})
            </button>
            {usedTools.map((t) => {
              const count = entries.filter(
                (e) => e.tool_id === t.id
              ).length;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilterTool(t.id)}
                  className={`rounded-xl border px-3.5 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    filterTool === t.id
                      ? "border-teal-300 bg-teal-50/70 text-teal-600 shadow-sm"
                      : "border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {t.name} ({count})
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-xs font-mono uppercase tracking-wider">
            Loading execution log...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-4">
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6">
            <SearchX className="h-8 w-8 text-slate-300" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-500">
              No executions found
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Run an AI tool to see your history here
            </p>
          </div>
          <Link
            href="/dashboard"
            className="mt-2 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 py-2 text-xs font-bold font-mono text-indigo-600 uppercase tracking-wider hover:bg-indigo-100/80 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Browse Tools
          </Link>
        </div>
      ) : (
        <section className="space-y-3">
          {filtered.map((entry, idx) => {
            const meta = getToolMeta(entry.tool_id);
            const colors = getCategoryColor(meta.category);
            const inputPreview = entry.input_data
              ? Object.values(entry.input_data)
                  .filter(Boolean)
                  .join(" · ")
                  .slice(0, 120)
              : null;

            return (
              <Link
                key={entry.id}
                href={`/dashboard/tools/${entry.tool_id}?history=${entry.id}`}
                className="group block rounded-2xl border border-slate-150/85 bg-white p-5 shadow-sm hover:border-teal-300/60 hover:shadow-[0_8px_30px_rgba(20,184,166,0.04)] transition-all duration-300"
                style={{
                  animationDelay: `${idx * 40}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    {/* Timeline dot */}
                    <div className="mt-1.5 flex flex-col items-center gap-1">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${colors.dot} ring-4 ring-white shadow-sm`}
                      />
                      {idx < filtered.length - 1 && (
                        <div className="w-px h-6 bg-slate-100" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[9px] font-bold font-mono tracking-widest uppercase ${colors.bg} ${colors.border} ${colors.text}`}
                        >
                          <Terminal className="h-3 w-3" />
                          {meta.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {timeAgo(entry.created_at)}
                        </span>
                      </div>

                      {inputPreview && (
                        <p className="mt-2 text-xs text-slate-500 truncate max-w-lg font-sans">
                          {inputPreview}
                        </p>
                      )}

                      {entry.output_text && (
                        <p className="mt-1.5 text-[11px] text-slate-400 line-clamp-2 max-w-lg font-sans leading-relaxed">
                          {entry.output_text.slice(0, 180)}
                          {entry.output_text.length > 180 ? "…" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 rounded-lg border border-slate-100 bg-slate-50 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
}
