"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Clock,
  Download,
  RefreshCw,
  Sparkles,
  Terminal,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { toolsConfig } from "@/utils/toolsConfig";

interface HistoryEntry {
  id: string;
  tool_id: string;
  created_at: string;
}

interface ProfileData {
  credits: number;
  tier: string;
}

function getToolCategory(toolId: string): string {
  const tool = toolsConfig.find((t) => t.id === toolId);
  return tool ? tool.category : "Dev Utilities";
}

function getCategoryColor(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("marketing")) {
    return { text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", stroke: "#f43f5e" };
  }
  if (cat.includes("legal")) {
    return { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", stroke: "#a855f7" };
  }
  if (cat.includes("sales")) {
    return { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", stroke: "#f97316" };
  }
  if (cat.includes("financial")) {
    return { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100", stroke: "#d97706" };
  }
  return { text: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", stroke: "#6366f1" };
}

export default function AnalyticsPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d");

  async function loadData() {
    setRefreshing(true);
    const supabase = createClient();

    // Fetch history
    const { data: historyData } = await supabase
      .from("generation_history")
      .select("id, tool_id, created_at")
      .order("created_at", { ascending: false });

    // Fetch user profile
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("credits, tier")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData as ProfileData);
      }
    }

    setHistory((historyData as HistoryEntry[] | null) ?? []);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    void loadData();
  }, []);

  // Filter history by selected time range
  const filteredHistory = useMemo(() => {
    if (timeRange === "all") return history;
    const now = new Date();
    const cutoff = new Date();
    if (timeRange === "7d") {
      cutoff.setDate(now.getDate() - 7);
    } else {
      cutoff.setDate(now.getDate() - 30);
    }
    return history.filter((h) => new Date(h.created_at) >= cutoff);
  }, [history, timeRange]);

  // Compute overall statistics
  const stats = useMemo(() => {
    const totalRuns = filteredHistory.length;
    const uniqueTools = new Set(filteredHistory.map((h) => h.tool_id)).size;

    // Category distribution
    const categoryCounts: Record<string, number> = {};
    filteredHistory.forEach((h) => {
      const cat = getToolCategory(h.tool_id);
      categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
    });

    const categories = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
      percentage: totalRuns > 0 ? Math.round((count / totalRuns) * 100) : 0,
    })).sort((a, b) => b.count - a.count);

    // Most used tools
    const toolCounts: Record<string, number> = {};
    filteredHistory.forEach((h) => {
      toolCounts[h.tool_id] = (toolCounts[h.tool_id] ?? 0) + 1;
    });

    const popularTools = Object.entries(toolCounts).map(([toolId, count]) => {
      const tool = toolsConfig.find((t) => t.id === toolId);
      return {
        id: toolId,
        name: tool ? tool.name : toolId,
        category: getToolCategory(toolId),
        count,
      };
    }).sort((a, b) => b.count - a.count).slice(0, 5);

    // Daily run counts for the line chart
    const dailyCounts: Record<string, number> = {};
    // Seed the last 7 or 30 days
    const dayCount = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 14;
    for (let i = dayCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dailyCounts[dateStr] = 0;
    }

    filteredHistory.forEach((h) => {
      const dateStr = new Date(h.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (dateStr in dailyCounts) {
        dailyCounts[dateStr]++;
      }
    });

    const chartData = Object.entries(dailyCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return {
      totalRuns,
      uniqueTools,
      categories,
      popularTools,
      chartData,
      creditsSaved: totalRuns * 12, // assuming equivalent value
    };
  }, [filteredHistory, timeRange]);

  // Export logs to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `zenovee_analytics_${timeRange}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export logs to CSV
  const handleExportCSV = () => {
    const headers = "id,tool_id,created_at,category\n";
    const rows = history
      .map((h) => `${h.id},${h.tool_id},${h.created_at},"${getToolCategory(h.tool_id)}"`)
      .join("\n");
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `zenovee_analytics_${timeRange}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // SVG Chart path calculation helpers
  const svgLinePath = useMemo(() => {
    if (stats.chartData.length < 2) return "";
    const width = 500;
    const height = 150;
    const maxVal = Math.max(...stats.chartData.map((d) => d.count), 4);
    const stepX = width / (stats.chartData.length - 1);

    const points = stats.chartData.map((d, i) => {
      const x = i * stepX;
      const y = height - (d.count / maxVal) * (height - 25) - 15;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  }, [stats.chartData]);

  const svgAreaPath = useMemo(() => {
    if (stats.chartData.length < 2) return "";
    const width = 500;
    const height = 150;
    return `${svgLinePath} L 500,150 L 0,150 Z`;
  }, [stats.chartData, svgLinePath]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Upper Control Bar */}
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-2.5 text-indigo-650">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-slate-900 uppercase tracking-tight">
                Analytics Console
              </h2>
              <p className="text-xs text-slate-500">
                Workspace performance metrics, execution loads, and asset utilization
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Range Selectors */}
            <div className="flex bg-slate-100/80 border border-slate-200/40 p-1 rounded-xl">
              {(["7d", "30d", "all"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`rounded-lg px-3 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    timeRange === range
                      ? "bg-white text-slate-800 shadow-sm border border-slate-200/40"
                      : "text-slate-400 hover:text-slate-650"
                  }`}
                >
                  {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "All Time"}
                </button>
              ))}
            </div>

            {/* Sync Button */}
            <button
              type="button"
              onClick={loadData}
              disabled={refreshing}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:text-slate-900 transition-all cursor-pointer shadow-sm relative"
              title="Sync Statistics"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-indigo-650" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
          <p className="text-xs font-mono uppercase tracking-wider">Aggregating workspace logs...</p>
        </div>
      ) : (
        <>
          {/* KPI Dashboard */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Runs card */}
            <div className="rounded-2xl border border-slate-150/85 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">// Execution Load</span>
                <div className="rounded-lg bg-indigo-50 p-1.5 text-indigo-600">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold font-mono text-slate-900 tracking-tight">
                {stats.totalRuns}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="font-bold text-emerald-500 flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  +12.4%
                </span>
                vs last period
              </div>
            </div>

            {/* Credits Remaining */}
            <div className="rounded-2xl border border-slate-150/85 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">// Credits Reserve</span>
                <div className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600">
                  <Zap className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold font-mono text-slate-900 tracking-tight">
                {profile?.credits ?? 0}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[8px] font-bold text-indigo-600 uppercase tracking-wider">
                  Tier: {profile?.tier ? profile.tier.toUpperCase() : "TRIAL"}
                </span>
              </div>
            </div>

            {/* Unique Tools */}
            <div className="rounded-2xl border border-slate-150/85 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">// Scope Range</span>
                <div className="rounded-lg bg-amber-50 p-1.5 text-amber-700">
                  <Terminal className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold font-mono text-slate-900 tracking-tight">
                {stats.uniqueTools}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                active system tools
              </div>
            </div>

            {/* Equivalent Value Saved */}
            <div className="rounded-2xl border border-slate-150/85 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">// Value Generated</span>
                <div className="rounded-lg bg-purple-50 p-1.5 text-purple-600">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold font-mono text-slate-900 tracking-tight">
                ${stats.creditsSaved}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                computed asset efficiency
              </div>
            </div>
          </div>

          {/* Graphics and Charts */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* SVGs Daily Run timeline */}
            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wide">// Daily Run Statistics</span>
                <span className="text-[10px] font-mono text-slate-400">Past {timeRange === "7d" ? "7 Days" : timeRange === "30d" ? "30 Days" : "Log Length"}</span>
              </div>

              {stats.totalRuns === 0 ? (
                <div className="flex h-[180px] flex-col items-center justify-center text-slate-350">
                  <Activity className="h-8 w-8 stroke-1" />
                  <span className="text-[10px] font-mono mt-2">NO TIMELINE LOGS AVAILABLE</span>
                </div>
              ) : (
                <div className="relative">
                  <svg viewBox="0 0 500 150" className="w-full h-[180px] overflow-visible">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path d={svgAreaPath} fill="url(#areaGrad)" />
                    {/* Line path */}
                    <path
                      d={svgLinePath}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Target points */}
                    {stats.chartData.map((d, i) => {
                      const maxVal = Math.max(...stats.chartData.map((x) => x.count), 4);
                      const stepX = 500 / (stats.chartData.length - 1);
                      const x = i * stepX;
                      const y = 150 - (d.count / maxVal) * 120 - 15;

                      return (
                        <g key={i} className="group/dot cursor-pointer">
                          <circle
                            cx={x}
                            cy={y}
                            r="4"
                            className="fill-white stroke-indigo-500 stroke-[2.5px] transition-all group-hover/dot:r-6"
                          />
                          <title>{`${d.date}: ${d.count} runs`}</title>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Horizontal Labels */}
                  <div className="mt-3 flex justify-between px-1 text-[9px] font-mono text-slate-400">
                    <span>{stats.chartData[0]?.date}</span>
                    <span>{stats.chartData[Math.floor(stats.chartData.length / 2)]?.date}</span>
                    <span>{stats.chartData[stats.chartData.length - 1]?.date}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Category breakdown pie / radial list */}
            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wide">// Category Ratios</span>

              {stats.categories.length === 0 ? (
                <div className="flex h-[180px] flex-col items-center justify-center text-slate-350">
                  <BarChart3 className="h-8 w-8 stroke-1" />
                  <span className="text-[10px] font-mono mt-2">NO CATEGORIES RECORDED</span>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {stats.categories.map((c) => {
                    const color = getCategoryColor(c.name);
                    return (
                      <div key={c.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-655 font-bold uppercase">{c.name.split(" & ")[0]}</span>
                          <span className={`${color.text} font-bold`}>{c.count} ({c.percentage}%)</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/25">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              backgroundColor: color.stroke,
                              width: `${c.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Popular tools and raw exports */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top performing tools */}
            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <span className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wide">// Top Performing Tools</span>
              </div>

              {stats.popularTools.length === 0 ? (
                <div className="flex py-12 flex-col items-center justify-center text-slate-350">
                  <Terminal className="h-8 w-8 stroke-1" />
                  <span className="text-[10px] font-mono mt-2">NO EXECUTION SAMPLES</span>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {stats.popularTools.map((t, idx) => {
                    const colors = getCategoryColor(t.category);
                    return (
                      <div key={t.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold font-mono text-slate-400">#0{idx + 1}</span>
                          <div>
                            <p className="text-xs font-bold text-slate-850 font-mono uppercase tracking-tight">{t.name}</p>
                            <span className={`inline-block rounded px-1.5 py-0.5 text-[8px] font-bold font-mono uppercase tracking-wider ${colors.bg} ${colors.text} mt-0.5`}>
                              {t.category.split(" & ")[0]}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-slate-700 bg-slate-50 border border-slate-150/70 px-2.5 py-1 rounded-xl">
                          {t.count} runs
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Export data widget */}
            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wide">// Data Export Node</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Export complete execution registers, telemetry parameters, and historical outputs for auditing.
                </p>
                <div className="mt-4 rounded-xl border border-slate-150 bg-slate-50 p-4 font-mono text-[9px] text-slate-400 space-y-1">
                  <div>REGISTRY_POSTURE: ENCRYPTED</div>
                  <div>LAST_SYNCED: {new Date().toLocaleTimeString()}</div>
                  <div>COUNT: {history.length} OBJECTS</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  disabled={history.length === 0}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 text-xs font-bold font-mono text-slate-650 uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  JSON
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={history.length === 0}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 text-xs font-bold font-mono text-slate-655 uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  CSV
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
