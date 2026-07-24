"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Activity,
  BarChart3,
  Download,
  RefreshCw,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

interface HistoryEntry {
  id: string;
  tool_id: string;
  created_at: string;
}

function getToolCategory(toolId: string): string {
  const tool = toolsConfig.find((t) => t.id === toolId);
  return tool ? tool.category : "Utilities";
}

function getCategoryColor(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("marketing")) {
    return { text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", stroke: "#f43f5e" };
  }
  if (cat.includes("legal") || cat.includes("financial")) {
    return { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", stroke: "#a855f7" };
  }
  if (cat.includes("sales")) {
    return { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", stroke: "#f97316" };
  }
  return { text: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", stroke: "#6366f1" };
}

export default function AnalyticsPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d");

  function loadData() {
    try {
      const stored = localStorage.getItem("zenovee_tool_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      setHistory([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

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

  const stats = useMemo(() => {
    const totalRuns = filteredHistory.length;
    const uniqueTools = new Set(filteredHistory.map((h) => h.tool_id)).size;

    const categoryCounts: Record<string, number> = {};
    filteredHistory.forEach((h) => {
      const cat = getToolCategory(h.tool_id);
      categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
    });

    const categories = Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalRuns > 0 ? Math.round((count / totalRuns) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    const toolCounts: Record<string, number> = {};
    filteredHistory.forEach((h) => {
      toolCounts[h.tool_id] = (toolCounts[h.tool_id] ?? 0) + 1;
    });

    const popularTools = Object.entries(toolCounts)
      .map(([toolId, count]) => {
        const tool = toolsConfig.find((t) => t.id === toolId);
        return {
          id: toolId,
          name: tool ? tool.name : toolId,
          category: getToolCategory(toolId),
          count,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const dailyCounts: Record<string, number> = {};
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
    };
  }, [filteredHistory, timeRange]);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `zenovee_analytics_${timeRange}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

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
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-2.5 text-indigo-650">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                Workspace Analytics
              </h2>
              <p className="text-xs text-slate-500">
                Client-side usage insights and execution statistics
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <div className="flex bg-slate-100/80 border border-slate-200/40 p-1 rounded-xl">
              {(["7d", "30d", "all"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    timeRange === range
                      ? "bg-white text-slate-800 shadow-sm border border-slate-200/40"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "All Time"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={loadData}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:text-slate-900 transition-all cursor-pointer shadow-sm relative"
              title="Sync Statistics"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
          <p className="text-xs uppercase tracking-wider">Loading local statistics...</p>
        </div>
      ) : (
        <>
          <div className="max-w-md">
            <div className="rounded-2xl border border-slate-150/85 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Total Utility Calculations
                </span>
                <div className="rounded-lg bg-indigo-50 p-1.5 text-indigo-600">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900 tracking-tight">
                {stats.totalRuns}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="font-bold text-emerald-500 flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  100% Client-Side
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Activity History
                </span>
                <span className="text-[10px] text-slate-400">
                  Past {timeRange === "7d" ? "7 Days" : timeRange === "30d" ? "30 Days" : "Log Length"}
                </span>
              </div>

              {stats.totalRuns === 0 ? (
                <div className="flex h-[180px] flex-col items-center justify-center text-slate-350">
                  <Activity className="h-8 w-8 stroke-1" />
                  <span className="text-[10px] mt-2">NO RECENT UTILITY RUNS</span>
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
                    <path d={svgAreaPath} fill="url(#areaGrad)" />
                    <path
                      d={svgLinePath}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                  <div className="mt-3 flex justify-between px-1 text-[9px] text-slate-400">
                    <span>{stats.chartData[0]?.date}</span>
                    <span>{stats.chartData[Math.floor(stats.chartData.length / 2)]?.date}</span>
                    <span>{stats.chartData[stats.chartData.length - 1]?.date}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Domain Ratios
              </span>

              {stats.categories.length === 0 ? (
                <div className="flex h-[180px] flex-col items-center justify-center text-slate-350">
                  <BarChart3 className="h-8 w-8 stroke-1" />
                  <span className="text-[10px] mt-2">NO DATA YET</span>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {stats.categories.map((c) => {
                    const color = getCategoryColor(c.name);
                    return (
                      <div key={c.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-600 font-bold uppercase">
                            {c.name.split(" & ")[0]}
                          </span>
                          <span className={`${color.text} font-bold`}>
                            {c.count} ({c.percentage}%)
                          </span>
                        </div>
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

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Most Used Utilities
                </span>
              </div>

              {stats.popularTools.length === 0 ? (
                <div className="flex py-12 flex-col items-center justify-center text-slate-350">
                  <Terminal className="h-8 w-8 stroke-1" />
                  <span className="text-[10px] mt-2">NO RUN DATA</span>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {stats.popularTools.map((t, idx) => {
                    const colors = getCategoryColor(t.category);
                    return (
                      <div key={t.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-400">#0{idx + 1}</span>
                          <div>
                            <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">{t.name}</p>
                            <span className={`inline-block rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} mt-0.5`}>
                              {t.category.split(" & ")[0]}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-xl text-slate-700">
                          {t.count} runs
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] border border-slate-150/85 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Export Local Logs
                </span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  Export your browser calculation logs and utility history for offline recordkeeping.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  disabled={history.length === 0}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  JSON
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={history.length === 0}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-sm"
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
