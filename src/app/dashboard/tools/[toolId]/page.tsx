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

  // ─── 404 ──────────────────────────────────────────────────────────
  if (!tool) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center animate-fade-in-up bg-[#080C14] text-slate-200">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-950/30 p-5 mb-6 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
          <ShieldAlert className="w-10 h-10 text-rose-400" />
        </div>
        <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 mb-2">
          COMMAND NOT REGISTERED
        </h1>
        <p className="text-slate-400 max-w-sm mb-8 text-xs font-mono leading-relaxed">
          The requested system executor tool ID is not recognized by the central console. Ensure database routing matches.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 rounded-xl border border-[#1C2C55] bg-[#0D1527] px-5 py-2.5 text-xs font-mono font-bold uppercase text-slate-300 hover:text-slate-100 hover:border-[#1E2E5D] transition-all"
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
    <div className="text-slate-200 animate-fade-in-up font-sans">
      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 transition-colors hover:text-slate-200 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Console Registry</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-teal-500/20 bg-teal-950/20 px-3 py-1.5 text-xs font-semibold text-teal-400 font-mono">
            <Zap className="w-3 h-3 animate-pulse" />
            {tool.cost} CREDITS
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1C2C55]/60 bg-[#0D1527]/50 px-3 py-1.5 text-xs font-semibold text-slate-400 font-mono">
            <Layers className="w-3 h-3" />
            {tool.category.toUpperCase().split(" & ")[0]}
          </span>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-8 rounded-2xl border border-[#1C2C55]/40 bg-[#0D1527]/30 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-teal-500/20 bg-teal-950/20 p-3.5 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 uppercase sm:text-3xl">
              {tool.name}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 max-w-3xl">
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
          className="flex flex-col rounded-2xl border border-[#1C2C55]/60 bg-[#0D1527]/50 shadow-lg shadow-black/25 overflow-hidden"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-[#1C2C55]/50 bg-[#0D1527] px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg border border-[#1C2C55] bg-[#080C14] p-1.5 shadow-inner">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Compiler Config
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-[#080C14] border border-[#1C2C55]/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500 ease-out"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                {filledCount}/{totalFields}
              </span>
            </div>
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-5 p-6 overflow-y-auto stagger-children">
            {tool.inputs.map((inputField) => (
              <div key={inputField.id} className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#4C5D8B] uppercase tracking-widest">
                  // {`PARAM_${inputField.id.toUpperCase()}`}
                  {(inputs[inputField.id] ?? "").trim().length > 0 && (
                    <Check className="w-3 h-3 text-emerald-400" />
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
                    className="w-full min-h-[140px] rounded-xl border border-[#1C2C55] bg-[#080C14]/90 p-3.5 font-mono text-xs text-slate-200 placeholder:text-slate-600 transition-all duration-200 resize-none focus:bg-[#080C14] focus:outline-none focus:ring-1 focus:ring-teal-500/20 focus:border-teal-500/40"
                  />
                ) : inputField.type === "dropdown" ? (
                  <div className="relative">
                    <select
                      required
                      value={inputs[inputField.id] || ""}
                      onChange={(e) =>
                        handleInputChange(inputField.id, e.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-[#1C2C55] bg-[#080C14]/90 p-3.5 pr-10 font-mono text-xs text-slate-200 transition-all duration-200 focus:bg-[#080C14] focus:outline-none focus:ring-1 focus:ring-teal-500/20 focus:border-teal-500/40"
                    >
                      <option value="" disabled className="bg-[#080C14] text-slate-600">
                        {inputField.placeholder ||
                          `Select option...`}
                      </option>
                      {(inputField.options || []).map((option) => (
                        <option key={option} value={option} className="bg-[#080C14] text-slate-300">
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
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
                    className="w-full rounded-xl border border-[#1C2C55] bg-[#080C14]/90 p-3.5 font-mono text-xs text-slate-200 placeholder:text-slate-600 transition-all duration-200 focus:bg-[#080C14] focus:outline-none focus:ring-1 focus:ring-teal-500/20 focus:border-teal-500/40"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="border-t border-[#1C2C55]/50 bg-[#0D1527] p-5 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 py-3.5 px-5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-lg shadow-teal-500/15 transition-all duration-300 hover:from-teal-500 hover:to-cyan-600 hover:shadow-xl hover:shadow-teal-500/25 hover:-translate-y-[1px] active:translate-y-0 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
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
              <p className="text-[10px] font-mono text-slate-500">
                Cost: {tool.cost} system credits
              </p>
              {(output || Object.keys(inputs).length > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-slate-350 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>

        {/* ── Output Panel (Terminal Simulator) ────────────────────────── */}
        <div className="flex flex-col rounded-2xl border border-[#1C2C55]/60 bg-[#050B14] shadow-lg shadow-black/25 overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between border-b border-[#16274B] bg-[#080C14] px-5 py-3 shrink-0">
            <div className="flex items-center gap-3">
              {/* macOS window controls */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/30 shadow-[0_0_8px_rgba(245,158,11,0.2)]" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
              </div>
              
              <div className="flex items-center gap-1.5 rounded-lg border border-[#1C2C55]/60 bg-[#0D1527] px-3 py-1">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-300">
                  zenovee-shell@core: ~
                </span>
              </div>

              {output && (
                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
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
                  className="rounded-lg border border-[#1C2C55] bg-[#0D1527] px-2.5 py-1 text-[10px] font-mono font-bold text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                  title={showRaw ? "Show rendered viewport" : "Show raw markdown"}
                >
                  {showRaw ? "RENDER" : "RAW"}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg border border-[#1C2C55] bg-[#0D1527] p-1 text-slate-400 hover:text-slate-200 active:scale-95 transition-all cursor-pointer"
                  title="Copy payload"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <ClipboardCopy className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-lg border border-[#1C2C55] bg-[#0D1527] p-1 text-slate-400 hover:text-slate-200 active:scale-95 transition-all cursor-pointer"
                  title="Export .md blueprint"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Terminal Console Viewport */}
          <div className="flex-1 overflow-y-auto output-scroll bg-[#050B14] relative text-slate-300 font-mono text-xs leading-relaxed p-6 selection:bg-teal-950 selection:text-teal-400">
            {/* ── Loading state (Terminal logging stream) ────────────────── */}
            {loading && (
              <div className="space-y-2 text-[11px] text-teal-400/90 font-mono">
                {terminalLogs.map((log, index) => (
                  <p key={index} className="animate-slide-in-left">
                    {log}
                  </p>
                ))}
                <div className="flex items-center gap-1.5 text-slate-500 pt-2 font-mono">
                  <span>[COMPILE] writing stdout buffer</span>
                  <span className="w-1 h-3.5 bg-teal-400 animate-pulse" />
                </div>
              </div>
            )}

            {/* ── Error state ─────────────────────────────────────── */}
            {error && !loading && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="rounded-xl border border-rose-950/80 bg-rose-950/20 p-4 border-l-4 border-l-rose-500">
                  <p className="text-xs font-bold text-rose-400 uppercase">
                    // fatal execution fault
                  </p>
                  <p className="mt-2 text-rose-350 text-[11px] leading-relaxed font-mono">
                    {`System fault: ${error}`}
                  </p>
                </div>
              </div>
            )}

            {/* ── Empty state (Terminal Prompt) ─────────────────────── */}
            {!loading && !error && !output && (
              <div className="flex h-full items-center justify-center text-center p-8">
                <div className="max-w-xs space-y-4 animate-fade-in-up">
                  <div className="mx-auto w-12 h-12 rounded-xl border border-dashed border-[#1C2C55] flex items-center justify-center text-slate-600">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      SYSTEM READY
                    </p>
                    <p className="mt-2 text-[10px] text-slate-600 leading-relaxed font-mono">
                      Input parameters in configuration deck, then invoke `Execute Compiler` to trigger engine.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Rendered markdown output ─────────────────────────── */}
            {!loading && output && !showRaw && (
              <div className="animate-fade-in-up text-slate-350 font-sans">
                {/* Success stamp */}
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3 font-mono text-[10px] text-emerald-400">
                  <div className="rounded-full bg-emerald-950/85 p-1 border border-emerald-500/40">
                    <Check className="w-3 h-3 text-emerald-400" />
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
                <div className="prose-output selection:bg-teal-900 selection:text-teal-200 text-slate-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {output}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* ── Raw editor output ────────────────────────────────── */}
            {!loading && output && showRaw && (
              <div className="animate-fade-in-up h-full">
                <pre className="rounded-xl border border-[#16274B] bg-[#03070D] p-5 overflow-x-auto h-full shadow-inner">
                  <code className="text-xs leading-relaxed text-teal-400/95 whitespace-pre-wrap break-words font-mono">
                    {output}
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Terminal Footer */}
          {output && !loading && (
            <div className="flex items-center justify-between border-t border-[#16274B] bg-[#080C14] px-5 py-3 shrink-0">
              <p className="text-[10px] font-mono text-slate-500 uppercase">
                // zenovee model stdout compiled
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D1527] border border-[#1C2C55] px-3 py-1.5 text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                >
                  <ClipboardCopy className="w-3 h-3" />
                  {copied ? "COPIED" : "COPY"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal-950/40 border border-teal-500/20 px-3 py-1.5 text-[10px] font-mono text-teal-400 hover:text-teal-200 transition-all cursor-pointer"
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
