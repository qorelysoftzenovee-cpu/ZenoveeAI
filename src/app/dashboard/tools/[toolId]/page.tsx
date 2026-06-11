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
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-white mb-2">Tool Specification Not Found</h1>
        <p className="text-slate-400 max-w-md mb-6">The requested tool ID does not match any authenticated configuration profiles inside our SaaS engine registry.</p>
        <button onClick={() => router.push("/dashboard")} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all">
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
    <div className="min-h-screen bg-[#030712] text-slate-100 p-6 md:p-8">
      <div className="max-w-[1600px] mx-auto mb-6 flex items-center justify-between">
        <button onClick={() => router.push("/dashboard")} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Tools Catalog</span>
        </button>
        <span className="text-xs bg-slate-800/60 text-slate-400 px-3 py-1 rounded-full border border-slate-700/50 font-mono">
          Token Weight: {(tool as { cost?: number }).cost ?? 5} Units
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{tool.name}</h1>
        <p className="text-slate-400 max-w-3xl text-sm leading-relaxed">{tool.description}</p>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleExecute} className="lg:col-span-5 bg-[#0B0F19] border border-slate-800/80 rounded-xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-semibold text-white tracking-wide border-b border-slate-800 pb-3">Operational Inputs</h2>

          {tool.inputs.map((inputField) => (
            <div key={inputField.id} className="space-y-2">
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">{inputField.label}</label>
              {inputField.type === "textarea" ? (
                <textarea
                  required
                  placeholder={inputField.placeholder || "Provide background context parameters..."}
                  value={inputs[inputField.id] || ""}
                  onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                  className="w-full h-32 bg-[#111827]/50 border border-slate-800 focus:border-indigo-500 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              ) : (
                <input
                  type="text"
                  required
                  placeholder={inputField.placeholder || "Enter target metadata..."}
                  value={inputs[inputField.id] || ""}
                  onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                  className="w-full bg-[#111827]/50 border border-slate-800 focus:border-indigo-500 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/10"
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
        <div className="lg:col-span-7 flex flex-col h-[640px] bg-[#09090B] border border-slate-800/80 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0F0F13] border-b border-slate-800/80 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/40 border border-rose-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/60" />
              <span className="text-xs font-mono text-slate-500 ml-2">output-terminal.md</span>
            </div>

            {output && (
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded transition-all" title="Copy Output">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button onClick={handleDownload} className="p-1.5 text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded transition-all" title="Export Markdown">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 font-sans select-text">
            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 font-mono text-xs">
                <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                <p className="animate-pulse">Awaiting data tokens from Groq API core node...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-950/30 border border-rose-800/50 rounded-lg text-rose-300 text-sm flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && !output && (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 font-mono text-xs max-w-sm mx-auto">
                <p className="border border-slate-800 border-dashed rounded-lg p-6 bg-slate-900/10">
                  System idle. Populate input matrix fields on the left pane and press execute to generate production blueprints.
                </p>
              </div>
            )}

            {!loading && output && (
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono selection:bg-indigo-500/30">
                {output}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
