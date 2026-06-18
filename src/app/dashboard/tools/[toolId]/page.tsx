"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ClipboardCopy,
  Download,
  FileText,
  Layers,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { toolsConfig } from "@/utils/toolsConfig";

export default function ToolWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toolId = params?.toolId as string;
  const tool = toolsConfig.find((t) => t.id === toolId);

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    const historyId = searchParams.get("history");
    if (!historyId) return;

    async function loadHistory() {
      const supabase = createClient();
      const { data } = await supabase
        .from("generation_history")
        .select("tool_id, input_data, output_text")
        .eq("id", historyId)
        .maybeSingle();

      if (!data || data.tool_id !== toolId) return;

      setInputs((data.input_data as Record<string, string> | null) ?? {});
      setOutput(data.output_text ?? "");
      setError(null);
    }

    void loadHistory();
  }, [searchParams, toolId]);

  const handleInputChange = useCallback((key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleExecute = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!tool) return;
      setLoading(true);
      setError(null);
      setOutput("");
      setTerminalLogs([]);

      const logsList = [
        `[INFO]  Spawning thread execution for command ID: "${toolId}"`,
        `[AUTH]  Validating developer token allocation in profile registry...`,
        `[LEDGER] Deducted token cost of ${tool.cost} credits... verified.`,
        `[MODEL]  Routing payload pipeline to groq:llama-3-70b-versatile...`,
        `[COMPILE] Merging prompt blueprints and parameter clusters...`,
        `[STREAM] Connecting to generative socket... streaming output...`,
      ];

      setTerminalLogs([logsList[0]]);

      const interval = setInterval(() => {
        setTerminalLogs((prev) => {
          if (prev.length >= logsList.length) {
            clearInterval(interval);
            return prev;
          }
          return [...prev, logsList[prev.length]];
        });
      }, 300);

      try {
        const response = await fetch("/api/process-tool", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toolId, tokenCost: tool.cost ?? 5, inputs }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Execution failed. Check connection parameters.");
        }

        const data = await response.json();
        // Wait to allow logs to print completely
        await new Promise((resolve) => setTimeout(resolve, 1400));
        setOutput(data.output);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected execution fault occurred."
        );
      } finally {
        clearInterval(interval);
        setLoading(false);
      }
    },
    [tool, toolId, inputs, router]
  );

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolId}-output.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, toolId]);

  const handleReset = useCallback(() => {
    setInputs({});
    setOutput("");
    setError(null);
    setTerminalLogs([]);
  }, []);

  const wordCount = useMemo(() => {
    if (!output) return 0;
    return output
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  }, [output]);

  const theme = useMemo(() => {
    if (!tool) return null;
    const cat = tool.category.toLowerCase();
    if (cat.includes("marketing")) {
      return {
        text: "text-rose-600",
        bg: "bg-rose-50/70",
        border: "border-rose-200/50",
        borderFocus: "focus:border-rose-500/60 focus:ring-rose-500/10",
        icon: "text-rose-500",
        badge: "border-rose-100 bg-rose-50/80 text-rose-650",
        btn: "from-rose-600 via-pink-600 to-rose-700 hover:shadow-rose-500/20",
        cursor: "bg-rose-500",
        glow: "shadow-[0_2px_8px_rgba(244,63,94,0.03)]",
        rawCode: "text-rose-600",
        progress: "from-rose-500 to-pink-500",
      };
    }
    if (cat.includes("legal")) {
      return {
        text: "text-purple-600",
        bg: "bg-purple-50/70",
        border: "border-purple-200/50",
        borderFocus: "focus:border-purple-500/60 focus:ring-purple-500/10",
        icon: "text-purple-500",
        badge: "border-purple-100 bg-purple-50/80 text-purple-650",
        btn: "from-purple-600 via-violet-600 to-purple-700 hover:shadow-purple-500/20",
        cursor: "bg-purple-500",
        glow: "shadow-[0_2px_8px_rgba(168,85,247,0.03)]",
        rawCode: "text-purple-600",
        progress: "from-purple-500 to-violet-500",
      };
    }
    if (cat.includes("financial") || cat.includes("sales engineering")) {
      if (cat.includes("sales")) {
        return {
          text: "text-orange-655",
          bg: "bg-orange-50/70",
          border: "border-orange-200/50",
          borderFocus: "focus:border-orange-500/60 focus:ring-orange-500/10",
          icon: "text-orange-500",
          badge: "border-orange-100 bg-orange-50/80 text-orange-650",
          btn: "from-orange-600 via-red-500 to-orange-700 hover:shadow-orange-500/20",
          cursor: "bg-orange-550",
          glow: "shadow-[0_2px_8px_rgba(249,115,22,0.03)]",
          rawCode: "text-orange-600",
          progress: "from-orange-500 to-red-500",
        };
      }
      return {
        text: "text-amber-700",
        bg: "bg-amber-50/70",
        border: "border-amber-200/50",
        borderFocus: "focus:border-amber-500/60 focus:ring-amber-500/10",
        icon: "text-amber-600",
        badge: "border-amber-100 bg-amber-50/80 text-amber-700",
        btn: "from-amber-600 via-orange-600 to-amber-700 hover:shadow-amber-500/20",
        cursor: "bg-amber-500",
        glow: "shadow-[0_2px_8px_rgba(245,158,11,0.03)]",
        rawCode: "text-amber-750",
        progress: "from-amber-500 to-orange-500",
      };
    }
    if (cat.includes("sales")) {
      return {
        text: "text-orange-655",
        bg: "bg-orange-50/70",
        border: "border-orange-200/50",
        borderFocus: "focus:border-orange-500/60 focus:ring-orange-500/10",
        icon: "text-orange-500",
        badge: "border-orange-100 bg-orange-50/80 text-orange-650",
        btn: "from-orange-600 via-red-500 to-orange-700 hover:shadow-orange-500/20",
        cursor: "bg-orange-550",
        glow: "shadow-[0_2px_8px_rgba(249,115,22,0.03)]",
        rawCode: "text-orange-600",
        progress: "from-orange-500 to-red-500",
      };
    }
    // Default is Dev/Complex Data Processing
    return {
      text: "text-indigo-650",
      bg: "bg-indigo-50/70",
      border: "border-indigo-200/50",
      borderFocus: "focus:border-indigo-550/60 focus:ring-indigo-550/10",
      icon: "text-indigo-500",
      badge: "border-indigo-100 bg-indigo-50/80 text-indigo-650",
      btn: "from-indigo-600 via-blue-600 to-indigo-700 hover:shadow-indigo-500/20",
      cursor: "bg-indigo-550",
      glow: "shadow-[0_2px_8px_rgba(99,102,241,0.03)]",
      rawCode: "text-indigo-650",
      progress: "from-indigo-500 to-blue-500",
    };
  }, [tool]);

  // ─── 404 ──────────────────────────────────────────────────────────
  if (!tool || !theme) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center animate-fade-in-up bg-[#FAFBFE] text-slate-800">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 mb-6 shadow-[0_4px_12px_rgba(244,63,94,0.05)]">
          <ShieldAlert className="w-10 h-10 text-rose-500" />
        </div>
        <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-900 mb-2 animate-pulse">
          COMMAND NOT REGISTERED
        </h1>
        <p className="text-slate-500 max-w-sm mb-8 text-xs font-mono leading-relaxed">
          The requested system executor tool ID is not recognized by the central console. Ensure database routing matches.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-mono font-bold uppercase text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Registry Index
        </button>
      </div>
    );
  }

  // ─── Computed ─────────────────────────────────────────────────────
  const filledCount = tool.inputs.filter(
    (f) => (inputs[f.id] ?? "").trim().length > 0
  ).length;
  const totalFields = tool.inputs.length;
  const fillPercent = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;

  return (
    <div className="text-slate-800 animate-fade-in-up font-sans">
      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 transition-colors hover:text-slate-700 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Console Registry</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/10 bg-emerald-50/70 px-3 py-1.5 text-xs font-semibold text-emerald-600 font-mono shadow-[0_2px_8px_rgba(16,185,129,0.02)]">
            <Zap className="w-3 h-3 animate-pulse text-emerald-500" />
            {tool.cost} CREDITS
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold font-mono shadow-sm ${theme.badge}`}>
            <Layers className="w-3 h-3" />
            {tool.category.toUpperCase().split(" & ")[0]}
          </span>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-start gap-4">
          <div className={`rounded-2xl border p-3.5 shadow-sm ${theme.border} ${theme.bg} ${theme.text}`}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-900 uppercase sm:text-3xl">
              {tool.name}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-3xl">
              {tool.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────── */}
      <div className="grid min-h-[calc(100vh-20rem)] grid-cols-1 gap-6 xl:grid-cols-[minmax(380px,0.85fr)_minmax(0,1.6fr)] items-stretch">
        {/* ── Input Panel ─────────────────────────────────────────── */}
        <form
          onSubmit={handleExecute}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
                <Terminal className={`w-3.5 h-3.5 ${theme.text}`} />
              </div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Compiler Config
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.progress} transition-all duration-500 ease-out`}
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500 tabular-nums">
                {filledCount}/{totalFields}
              </span>
            </div>
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-5 p-6 overflow-y-auto stagger-children">
            {tool.inputs.map((inputField) => (
              <div key={inputField.id} className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  // {`PARAM_${inputField.id.toUpperCase()}`}
                  {(inputs[inputField.id] ?? "").trim().length > 0 && (
                    <Check className="w-3 h-3 text-emerald-500" />
                  )}
                </label>

                {inputField.type === "textarea" ? (
                  <textarea
                    required
                    placeholder={inputField.placeholder || "Enter configuration data..."}
                    value={inputs[inputField.id] || ""}
                    onChange={(e) =>
                      handleInputChange(inputField.id, e.target.value)
                    }
                    className={`w-full min-h-[140px] rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 font-mono text-xs text-slate-800 placeholder:text-slate-400 transition-all duration-200 resize-none focus:bg-white focus:outline-none focus:ring-2 ${theme.borderFocus}`}
                  />
                ) : inputField.type === "dropdown" ? (
                  <div className="relative">
                    <select
                      required
                      value={inputs[inputField.id] || ""}
                      onChange={(e) =>
                        handleInputChange(inputField.id, e.target.value)
                      }
                      className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 pr-10 font-mono text-xs text-slate-800 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${theme.borderFocus}`}
                    >
                      <option value="" disabled className="bg-white text-slate-400">
                        {inputField.placeholder || `Select option...`}
                      </option>
                      {(inputField.options || []).map((option) => (
                        <option key={option} value={option} className="bg-white text-slate-800">
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                ) : (
                  <input
                    type="text"
                    required
                    placeholder={inputField.placeholder || "Enter parameter value..."}
                    value={inputs[inputField.id] || ""}
                    onChange={(e) =>
                      handleInputChange(inputField.id, e.target.value)
                    }
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 font-mono text-xs text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${theme.borderFocus}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="border-t border-slate-100 bg-slate-50/30 p-5 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${theme.btn} py-3.5 px-5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.005] hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 disabled:from-slate-200 disabled:to-slate-250 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <div className="relative flex items-center justify-center gap-2.5">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Executing compiler...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Execute Compiler</span>
                  </>
                )}
              </div>
            </button>

            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono text-slate-400">
                Cost: {tool.cost} system credits
              </p>
              {(output || Object.keys(inputs).length > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>

        {/* ── Output Panel (Terminal Simulator) ────────────────────────── */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 shrink-0">
            <div className="flex items-center gap-3">
              {/* macOS window controls */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">
                <Terminal className={`w-3.5 h-3.5 ${theme.text}`} />
                <span className="text-[10px] font-mono text-slate-600">
                  zenovee-shell@core: ~
                </span>
              </div>

              {output && (
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                  [{wordCount} words compiled]
                </span>
              )}
            </div>

            {/* Terminal Actions */}
            {output && !loading && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowRaw((v) => !v)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-mono font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                  title={showRaw ? "Show rendered viewport" : "Show raw markdown"}
                >
                  {showRaw ? "RENDER" : "RAW"}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg border border-slate-200 bg-white p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
                  title="Copy payload"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <ClipboardCopy className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-lg border border-slate-200 bg-white p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
                  title="Export .md blueprint"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Terminal Console Viewport */}
          <div className="flex-1 overflow-y-auto output-scroll bg-[#F8FAFC] relative text-slate-700 font-mono text-xs leading-relaxed p-6 selection:bg-teal-100 selection:text-teal-900">
            {/* ── Loading state (Terminal logging stream) ────────────────── */}
            {loading && (
              <div className="space-y-2 text-[11px] text-slate-600 font-mono">
                {terminalLogs.map((log, index) => (
                  <p key={index} className={`animate-slide-in-left ${log.includes('[INFO]') || log.includes('[STREAM]') ? theme.text : 'text-slate-450'}`}>
                    {log}
                  </p>
                ))}
                <div className="flex items-center gap-1.5 text-slate-400 pt-2 font-mono">
                  <span>[COMPILE] writing stdout buffer</span>
                  <span className={`w-1 h-3.5 ${theme.cursor} animate-pulse`} />
                </div>
              </div>
            )}

            {/* ── Error state ─────────────────────────────────────── */}
            {error && !loading && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 border-l-4 border-l-rose-500">
                  <p className="text-xs font-bold text-rose-600 uppercase">
                    // fatal execution fault
                  </p>
                  <p className="mt-2 text-rose-700 text-[11px] leading-relaxed font-mono">
                    {`System fault: ${error}`}
                  </p>
                </div>
              </div>
            )}

            {/* ── Empty state (Terminal Prompt) ─────────────────────── */}
            {!loading && !error && !output && (
              <div className="flex h-full items-center justify-center text-center p-8">
                <div className="max-w-xs space-y-4 animate-fade-in-up">
                  <div className="mx-auto w-12 h-12 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                      SYSTEM READY
                    </p>
                    <p className="mt-2 text-[10px] text-slate-400 leading-relaxed font-mono">
                      Input parameters in configuration deck, then invoke `Execute Compiler` to trigger engine.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Rendered markdown output ─────────────────────────── */}
            {!loading && output && !showRaw && (
              <div className="animate-fade-in-up text-slate-700 font-sans">
                {/* Success stamp */}
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 font-mono text-[10px] text-emerald-600">
                  <div className="rounded-full bg-emerald-100 p-1 border border-emerald-250">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <p className="uppercase tracking-wider">
                    COMPILE OK // CODE STATUS 200 •{" "}
                    <span className="tabular-nums">
                      {wordCount.toLocaleString()}
                    </span>{" "}
                    WORDS STREAMED
                  </p>
                </div>

                {/* Markdown compiler preview styling override */}
                <div className="prose-output selection:bg-teal-100 selection:text-teal-900 text-slate-700 prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {output}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* ── Raw editor output ────────────────────────────────── */}
            {!loading && output && showRaw && (
              <div className="animate-fade-in-up h-full">
                <pre className="rounded-xl border border-slate-200 bg-white p-5 overflow-x-auto h-full shadow-inner">
                  <code className={`text-xs leading-relaxed ${theme.rawCode} whitespace-pre-wrap break-words font-mono`}>
                    {output}
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Terminal Footer */}
          {output && !loading && (
            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3 shrink-0">
              <p className="text-[10px] font-mono text-slate-400 uppercase">
                // {toolId.toUpperCase()} model stdout compiled
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-[10px] font-mono text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                >
                  <ClipboardCopy className="w-3 h-3" />
                  {copied ? "COPIED" : "COPY"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-mono transition-all cursor-pointer shadow-sm ${theme.bg} ${theme.border} ${theme.text} hover:opacity-80`}
                >
                  <Download className="w-3 h-3" />
                  EXPORT .MD
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
