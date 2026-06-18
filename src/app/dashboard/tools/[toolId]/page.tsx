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
      try {
        const response = await fetch("/api/process-tool", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toolId, tokenCost: tool.cost ?? 5, inputs }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Processing failed. Please try again.");
        }

        const data = await response.json();
        setOutput(data.output);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center animate-fade-in-up">
        <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100/50 p-5 mb-6">
          <ShieldAlert className="w-10 h-10 text-rose-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Tool Not Found
        </h1>
        <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
          The requested tool does not exist in the registry. It may have been
          removed or the URL is incorrect.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
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
    <div className="text-slate-900 animate-fade-in-up">
      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>All Tools</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-600">
            <Zap className="w-3 h-3" />
            {tool.cost} credits
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
            <Layers className="w-3 h-3" />
            {tool.category}
          </span>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-3.5 text-teal-500 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
              {tool.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 max-w-3xl">
              {tool.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────── */}
      <div className="grid min-h-[calc(100vh-16rem)] grid-cols-1 gap-6 xl:grid-cols-[minmax(380px,0.9fr)_minmax(0,1.55fr)] items-stretch">
        {/* ── Input Panel ─────────────────────────────────────────── */}
        <form
          onSubmit={handleExecute}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-800 tracking-wide">
                Configuration
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500 ease-out"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-medium text-slate-400 tabular-nums">
                {filledCount}/{totalFields}
              </span>
            </div>
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-5 p-6 overflow-y-auto stagger-children">
            {tool.inputs.map((inputField) => (
              <div key={inputField.id} className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {inputField.label}
                  {(inputs[inputField.id] ?? "").trim().length > 0 && (
                    <Check className="w-3 h-3 text-emerald-500" />
                  )}
                </label>

                {inputField.type === "textarea" ? (
                  <textarea
                    required
                    placeholder={inputField.placeholder || "Enter details..."}
                    value={inputs[inputField.id] || ""}
                    onChange={(e) =>
                      handleInputChange(inputField.id, e.target.value)
                    }
                    className="w-full min-h-[120px] rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-300"
                  />
                ) : inputField.type === "dropdown" ? (
                  <div className="relative">
                    <select
                      required
                      value={inputs[inputField.id] || ""}
                      onChange={(e) =>
                        handleInputChange(inputField.id, e.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 pr-10 text-sm text-slate-800 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-300"
                    >
                      <option value="" disabled>
                        {inputField.placeholder ||
                          `Select ${inputField.label.toLowerCase()}...`}
                      </option>
                      {(inputField.options || []).map((option) => (
                        <option key={option} value={option}>
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
                    placeholder={inputField.placeholder || "Enter value..."}
                    value={inputs[inputField.id] || ""}
                    onChange={(e) =>
                      handleInputChange(inputField.id, e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-300"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="border-t border-slate-100 bg-gradient-to-r from-slate-50/80 to-white p-5 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 py-3.5 px-5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:from-teal-500 hover:to-cyan-500 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-[1px] active:translate-y-0 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <div className="relative flex items-center justify-center gap-2.5">
                {loading ? (
                  <>
                    <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Generate Output</span>
                  </>
                )}
              </div>
            </button>

            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-400">
                Uses {tool.cost} credits per run
              </p>
              {(output || Object.keys(inputs).length > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>

        {/* ── Output Panel ────────────────────────────────────────── */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Output header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1">
                <FileText className="w-3 h-3 text-slate-400" />
                <span className="text-[11px] font-medium text-slate-500">
                  output.md
                </span>
              </div>
              {output && (
                <span className="text-[10px] text-slate-400 tabular-nums">
                  {wordCount.toLocaleString()} words
                </span>
              )}
            </div>

            {output && (
              <div className="flex items-center gap-1.5">
                {/* Toggle raw / rendered */}
                <button
                  type="button"
                  onClick={() => setShowRaw((v) => !v)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700"
                  title={showRaw ? "Show rendered" : "Show raw markdown"}
                >
                  {showRaw ? "Rendered" : "Raw"}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700 active:scale-95"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <ClipboardCopy className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700 active:scale-95"
                  title="Download as markdown"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Output body */}
          <div className="flex-1 overflow-y-auto output-scroll bg-[#FAFBFE] relative">
            {/* ── Loading state ───────────────────────────────────── */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#FAFBFE] z-10">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center animate-pulse-glow">
                    <Sparkles className="w-6 h-6 text-teal-500" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    AI is generating your output
                  </p>
                  <p className="text-xs text-slate-400">
                    Processing with advanced language model...
                  </p>
                  <div className="flex items-center justify-center gap-1.5 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 loading-dot" />
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 loading-dot" />
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 loading-dot" />
                  </div>
                </div>
              </div>
            )}

            {/* ── Error state ─────────────────────────────────────── */}
            {error && !loading && (
              <div className="p-6 animate-fade-in-up">
                <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 to-rose-50/50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-rose-200 bg-white p-2 shadow-sm">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-rose-800">
                        Generation Failed
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-rose-600">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Empty state ─────────────────────────────────────── */}
            {!loading && !error && !output && (
              <div className="flex h-full items-center justify-center p-8">
                <div className="text-center max-w-xs space-y-5 animate-fade-in-up">
                  <div className="mx-auto w-16 h-16 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                    <Terminal className="w-7 h-7 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Ready to generate
                    </p>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                      Fill in the configuration fields and click{" "}
                      <span className="font-semibold text-teal-500">
                        Generate Output
                      </span>{" "}
                      to create your content.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Rendered output ─────────────────────────────────── */}
            {!loading && output && !showRaw && (
              <div className="p-6 sm:p-8 lg:p-10 animate-fade-in-up">
                {/* Success banner */}
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-50/50 px-4 py-3">
                  <div className="rounded-full bg-emerald-100 p-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <p className="text-xs font-medium text-emerald-700">
                    Generation complete •{" "}
                    <span className="tabular-nums">
                      {wordCount.toLocaleString()}
                    </span>{" "}
                    words •{" "}
                    <button
                      onClick={handleCopy}
                      className="underline underline-offset-2 hover:text-emerald-900 transition-colors"
                    >
                      {copied ? "Copied!" : "Copy all"}
                    </button>
                  </p>
                </div>

                {/* Markdown content */}
                <div className="prose-output selection:bg-teal-100">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {output}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* ── Raw output ──────────────────────────────────────── */}
            {!loading && output && showRaw && (
              <div className="p-6 animate-fade-in-up">
                <pre className="rounded-xl border border-slate-200 bg-[#0f172a] p-5 overflow-x-auto">
                  <code className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap break-words font-mono">
                    {output}
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Output footer (when content is present) */}
          {output && !loading && (
            <div className="flex items-center justify-between border-t border-slate-100 bg-gradient-to-r from-slate-50/80 to-white px-5 py-3 shrink-0">
              <p className="text-[11px] text-slate-400">
                Powered by AI • Results may require review
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600 transition-all hover:bg-slate-200"
                >
                  <ClipboardCopy className="w-3 h-3" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-1.5 text-[11px] font-medium text-teal-600 transition-all hover:bg-teal-100"
                >
                  <Download className="w-3 h-3" />
                  Export .md
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
