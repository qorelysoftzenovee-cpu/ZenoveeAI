"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Copy, Check, Download, Play, ShieldAlert } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { toolsConfig } from "@/utils/toolsConfig";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

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

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Tool Specification Not Found</h1>
        <p className="text-slate-500 max-w-md mb-6">The requested tool ID does not match any authenticated configuration profiles inside our SaaS engine registry.</p>
        <button onClick={() => router.push("/dashboard")} className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-900 font-medium rounded-lg transition-all">
          Return to Dashboard Hub
        </button>
      </div>
    );
  }

  const handleInputChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const response = await fetch("/api/process-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, tokenCost: (tool as { cost?: number }).cost ?? 5, inputs }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "System engine processing failure.");
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during execution.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${toolId}-generation.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <button onClick={() => router.push("/dashboard")} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Tools Catalog</span>
        </button>
        <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1 rounded-full border border-slate-200 font-mono">
          Token Weight: {(tool as { cost?: number }).cost ?? 5} Units
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{tool.name}</h1>
        <p className="text-slate-500 max-w-3xl text-sm leading-relaxed">{tool.description}</p>
      </div>

      <div className="grid min-h-[calc(100vh-13rem)] grid-cols-1 gap-6 xl:grid-cols-[minmax(380px,0.95fr)_minmax(0,1.45fr)] items-start">
        <form onSubmit={handleExecute} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 h-full">
          <h2 className="text-lg font-semibold text-slate-900 tracking-wide border-b border-slate-200 pb-3">Operational Inputs</h2>

          {tool.inputs.map((inputField) => (
            <div key={inputField.id} className="space-y-2">
              <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">{inputField.label}</label>
              {inputField.type === "textarea" ? (
                <textarea
                  required
                  placeholder={inputField.placeholder || "Provide background context parameters..."}
                  value={inputs[inputField.id] || ""}
                  onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                  className="w-full h-32 bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-300 resize-none"
                />
              ) : inputField.type === "dropdown" ? (
                <select
                  required
                  value={inputs[inputField.id] || ""}
                  onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-300"
                >
                  <option value="" disabled>
                    {inputField.placeholder || `Select ${inputField.label.toLowerCase()}...`}
                  </option>
                  {(inputField.options || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  placeholder={inputField.placeholder || "Enter target metadata..."}
                  value={inputs[inputField.id] || ""}
                  onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-300"
                />
              )}
            </div>
          ))}

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/10"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Architecture...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                  <span>Execute Automation Framework</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-500 font-mono">
              Running this command will deduct {(tool as { cost?: number }).cost ?? 5} processing credits from your account ledger balance.
            </p>
          </div>
        </form>
        <div className="flex min-h-[640px] h-full flex-col bg-white border border-slate-200/60 rounded-xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/40 border border-rose-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/60" />
              <span className="text-xs font-mono text-slate-500 ml-2">output-terminal.md</span>
            </div>

            {output && (
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="rounded border border-slate-200 bg-white p-1.5 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900" title="Copy Output">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <button onClick={handleDownload} className="rounded border border-slate-200 bg-white p-1.5 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900" title="Export Markdown">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 font-sans select-text">
            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-3 font-mono text-xs text-slate-500">
                <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                <p className="animate-pulse">Awaiting data tokens from Groq API core node...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && !output && (
              <div className="mx-auto flex h-full max-w-sm flex-col items-center justify-center text-center font-mono text-xs text-slate-500">
                <p className="rounded-lg border border-slate-200 border-dashed bg-white p-6">
                  System idle. Populate input matrix fields on the left pane and press execute to generate production blueprints.
                </p>
              </div>
            )}

            {!loading && output && (
              <div className="max-w-none whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700 selection:bg-indigo-100">
                {output}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
