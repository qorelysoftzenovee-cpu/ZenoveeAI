"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
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
  Search,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { toolsConfig } from "@/utils/toolsConfig";

const tabs = [
  { id: "all", label: "All Categories" },
  { id: "marketing", label: "Marketing" },
  { id: "legal", label: "Legal & HR" },
  { id: "financial", label: "Financial & Ops" },
  { id: "sales", label: "Sales & Strategy" },
  { id: "dev", label: "Technical & Dev" },
] as const;

function getCategoryBadge(category: string) {
  if (category.includes("Marketing")) return "bg-teal-50 text-teal-600 border border-teal-100/50";
  if (category.includes("Legal")) return "bg-violet-50 text-violet-600 border border-violet-100/50";
  if (category.includes("Financial")) return "bg-amber-50 text-amber-600 border border-amber-100/50";
  if (category.includes("Sales")) return "bg-rose-50 text-rose-600 border border-rose-100/50";
  return "bg-cyan-50 text-cyan-600 border border-cyan-100/50";
}

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Unified State
  const [activeToolId, setActiveToolId] = useState<string>("");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("all");
  
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  // Terminal Execution Simulation state
  const [phase, setPhase] = useState<"idle" | "initializing" | "running" | "streaming" | "done">("idle");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [credits, setCredits] = useState<number | null>(null);

  // Mobile View Tabs: "tools" | "inputs" | "console"
  const [mobileTab, setMobileTab] = useState<"tools" | "inputs" | "console">("tools");

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Fetch current user credits from profiles
  const fetchCredits = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("credits")
          .eq("id", user.id)
          .maybeSingle();
        if (profile) {
          setCredits(profile.credits);
        }
      }
    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  }, []);

  // Sync state with URL params on load
  useEffect(() => {
    fetchCredits();

    const historyId = searchParams.get("history");
    const toolId = searchParams.get("tool");

    let initialToolId = toolId;
    if (!initialToolId && toolsConfig.length > 0) {
      initialToolId = toolsConfig[0].id;
    }
    if (initialToolId) {
      setActiveToolId(initialToolId);
    }

    if (!historyId) return;

    async function loadHistory() {
      setLoading(true);
      setPhase("initializing");
      setConsoleLogs([
        "> [SYSTEM] Initializing loading sequence...",
        `> [SYSTEM] Fetching generation history record ID: ${historyId}...`
      ]);
      
      const supabase = createClient();
      const { data } = await supabase
        .from("generation_history")
        .select("tool_id, input_data, output_text")
        .eq("id", historyId)
        .maybeSingle();

      if (!data) {
        setLoading(false);
        setPhase("idle");
        setError("History record not found.");
        return;
      }
      
      setActiveToolId(data.tool_id);
      setInputs((data.input_data as Record<string, string> | null) ?? {});
      setOutput(data.output_text ?? "");
      setConsoleLogs([
        `> [SYSTEM] History record fetched successfully.`,
        `> [SYSTEM] Tool configuration loaded: ${data.tool_id}.`,
        `> [SYSTEM] Generation rendered below.`
      ]);
      setPhase("done");
      setLoading(false);
      setMobileTab("console");
    }

    void loadHistory();
  }, [searchParams, fetchCredits]);

  // Selected tool object
  const tool = useMemo(() => {
    return toolsConfig.find((t) => t.id === activeToolId) || toolsConfig[0];
  }, [activeToolId]);

  // Filter tools list based on query and tabs
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    return toolsConfig.filter((t) => {
      const matchesQuery =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "marketing" && t.category.includes("Marketing")) ||
        (activeTab === "dev" && t.category.includes("Complex Data Processing")) ||
        (activeTab === "financial" && t.category.includes("Financial Intelligence")) ||
        (activeTab === "legal" && t.category.includes("Legal")) ||
        (activeTab === "sales" && t.category.includes("Sales Engineering"));

      return matchesQuery && matchesTab;
    });
  }, [activeTab, query]);

  // Select tool handler
  const handleSelectTool = useCallback((toolId: string) => {
    setActiveToolId(toolId);
    setInputs({});
    setOutput("");
    setError(null);
    setPhase("idle");
    setConsoleLogs([]);
    
    // Update URL query parameter without full reload
    const url = new URL(window.location.href);
    url.searchParams.set("tool", toolId);
    url.searchParams.delete("history");
    window.history.replaceState(null, "", url.toString());

    // Switch to inputs view on mobile
    setMobileTab("inputs");
  }, []);

  const handleInputChange = useCallback((key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Smoothly scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs, output, phase]);

  // Execute tool
  const handleExecute = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!tool) return;

      setLoading(true);
      setError(null);
      setOutput("");
      setPhase("initializing");
      setMobileTab("console");

      // Set initial console output logs
      setConsoleLogs([
        "> [INIT] Establishing secure API Gateway handshake...",
        "> [AUTH] Validating active user session tokens...",
      ]);

      // Progress animation steps
      const t1 = setTimeout(() => {
        setConsoleLogs((prev) => [
          ...prev,
          `> [CREDIT] Authorizing credit token deduction (Cost: ${tool.cost} credits)...`
        ]);
      }, 500);

      const t2 = setTimeout(() => {
        setConsoleLogs((prev) => [
          ...prev,
          "> [MODEL] Dispatching prompt payload request to Llama-3.3-70B model...",
          "> [MODEL] Waiting for server completion response..."
        ]);
      }, 1100);

      try {
        const response = await fetch("/api/process-tool", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toolId: tool.id, tokenCost: tool.cost ?? 5, inputs }),
        });

        clearTimeout(t1);
        clearTimeout(t2);

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Execution failed. Please try again.");
        }

        const data = await response.json();
        
        setConsoleLogs((prev) => [
          ...prev,
          "> [OK] API payload received successfully.",
          "> [OK] Deducted credits. Re-fetching session balance.",
          "> [OK] Output model stream initialized below."
        ]);

        // Fetch new credits balance client-side and trigger Next.js layout refresh
        void fetchCredits();
        router.refresh();

        // Stream output
        setPhase("streaming");
        const fullText = data.output;
        let wordIdx = 0;
        const words = fullText.split(" ");
        let currentText = "";
        
        const streamInterval = setInterval(() => {
          if (wordIdx < words.length) {
            const nextIndex = Math.min(wordIdx + 5, words.length);
            const chunk = words.slice(wordIdx, nextIndex).join(" ");
            currentText = currentText ? `${currentText} ${chunk}` : chunk;
            setOutput(currentText);
            wordIdx = nextIndex;
          } else {
            clearInterval(streamInterval);
            setPhase("done");
            setLoading(false);
          }
        }, 30);

      } catch (err) {
        clearTimeout(t1);
        clearTimeout(t2);
        const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
        setConsoleLogs((prev) => [
          ...prev,
          `> [ERROR] Thread execution interrupted.`,
          `> [ERROR] Reason: ${errMsg}`
        ]);
        setError(errMsg);
        setPhase("done");
        setLoading(false);
      }
    },
    [tool, inputs, router, fetchCredits]
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
    a.download = `${tool.id}-output.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, tool]);

  const handleReset = useCallback(() => {
    setInputs({});
    setOutput("");
    setError(null);
    setPhase("idle");
    setConsoleLogs([]);
  }, []);

  const wordCount = useMemo(() => {
    if (!output) return 0;
    return output.split(/\s+/).filter((w) => w.length > 0).length;
  }, [output]);

  // Form field completed progress calculation
  const filledCount = useMemo(() => {
    if (!tool) return 0;
    return tool.inputs.filter((f) => (inputs[f.id] ?? "").trim().length > 0).length;
  }, [tool, inputs]);

  const totalFields = tool ? tool.inputs.length : 0;
  const fillPercent = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;

  return (
    <div className="flex flex-col h-full bg-[#FAFBFE] text-[#1E293B] -mt-4">
      {/* 🛠️ Mobile Tab Selector (Visible on mobile/tablet, hidden on desktop) */}
      <div className="flex lg:hidden border-b border-slate-200 bg-white sticky top-0 z-30 px-4 py-2 justify-around">
        <button
          onClick={() => setMobileTab("tools")}
          className={`flex-1 py-2 text-center text-xs font-bold transition-all border-b-2 ${
            mobileTab === "tools" ? "border-teal-500 text-teal-600" : "border-transparent text-slate-500"
          }`}
        >
          Tools Browser
        </button>
        <button
          onClick={() => setMobileTab("inputs")}
          className={`flex-1 py-2 text-center text-xs font-bold transition-all border-b-2 ${
            mobileTab === "inputs" ? "border-teal-500 text-teal-600" : "border-transparent text-slate-500"
          }`}
        >
          Configuration
        </button>
        <button
          onClick={() => setMobileTab("console")}
          className={`flex-1 py-2 text-center text-xs font-bold transition-all border-b-2 relative ${
            mobileTab === "console" ? "border-teal-500 text-teal-600" : "border-transparent text-slate-500"
          }`}
        >
          Console Output
          {loading && (
            <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          )}
        </button>
      </div>

      {/* 🚀 Main Layout container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-1 items-stretch lg:h-[calc(100vh-16.5rem)] min-h-[600px] overflow-hidden">
        
        {/* ── COLUMN 1: Tools Explorer (Left Column) ────────────────────── */}
        <div
          className={`col-span-1 lg:col-span-3 flex flex-col bg-white border border-slate-200/80 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden ${
            mobileTab === "tools" ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Search Bar */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 50 tools..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs text-[#1E293B] outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-1 focus:ring-teal-100"
              />
            </div>
          </div>

          {/* Categories Horizontal Scrolling Filter */}
          <div className="flex gap-2 p-3 overflow-x-auto border-b border-slate-100 scrollbar-none whitespace-nowrap bg-white select-none shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold border transition-all ${
                    isActive
                      ? "border-teal-200 bg-teal-50 text-teal-600 shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Scrollable Tools List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#FBFBFC] scrollbar-thin">
            {filteredTools.length > 0 ? (
              filteredTools.map((t) => {
                const isSelected = t.id === activeToolId;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTool(t.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? "border-teal-300 bg-teal-50/30 shadow-sm shadow-teal-500/5"
                        : "border-slate-150 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wide ${getCategoryBadge(t.category)}`}>
                        {t.category.split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-0.5 shrink-0">
                        <Zap className="w-2.5 h-2.5 text-amber-500" />
                        {t.cost} cr
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold leading-snug transition-colors ${
                      isSelected ? "text-teal-700" : "text-slate-800"
                    }`}>
                      {t.name}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-400 line-clamp-2">
                      {t.description}
                    </p>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 px-4 text-slate-400 text-xs">
                No tools match your filters.
              </div>
            )}
          </div>
          
          {/* Sidebar Workspace Info Footer */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Credits: {credits !== null ? credits : "..."}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gateway: Online
            </span>
          </div>
        </div>

        {/* ── COLUMN 2: Active Tool Input configuration Form ───────────── */}
        <div
          className={`col-span-1 lg:col-span-4 flex flex-col bg-white border border-slate-200/80 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden ${
            mobileTab === "inputs" ? "block" : "hidden lg:flex"
          }`}
        >
          {tool ? (
            <form onSubmit={handleExecute} className="flex flex-col h-full">
              {/* Dynamic Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-2.5 text-teal-600 shadow-sm shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 leading-snug">{tool.name}</h3>
                    <p className="text-[11px] leading-relaxed text-slate-400 mt-1">{tool.description}</p>
                  </div>
                </div>
              </div>

              {/* Progress Checklist bar */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Parameters Configuration
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                    {filledCount}/{totalFields}
                  </span>
                </div>
              </div>

              {/* Input Fields Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
                {tool.inputs.map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {field.label}
                      {(inputs[field.id] ?? "").trim().length > 0 && (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        required
                        value={inputs[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || "Enter details..."}
                        className="w-full min-h-[100px] text-xs rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-slate-800 placeholder:text-slate-400 transition-all resize-none focus:bg-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100"
                      />
                    ) : field.type === "dropdown" ? (
                      <div className="relative">
                        <select
                          required
                          value={inputs[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full appearance-none text-xs rounded-xl border border-slate-200 bg-slate-50/50 p-3 pr-10 text-slate-800 transition-all focus:bg-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100"
                        >
                          <option value="" disabled>
                            {field.placeholder || `Select ${field.label.toLowerCase()}...`}
                          </option>
                          {(field.options || []).map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    ) : (
                      <input
                        type="text"
                        required
                        value={inputs[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || "Enter value..."}
                        className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-slate-800 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons bar */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-col gap-2 shrink-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 py-3 px-4 text-xs font-bold text-white shadow-md shadow-teal-500/10 transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Running Thread...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Execute ({tool.cost} Credits)</span>
                      </>
                    )}
                  </span>
                </button>

                <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
                  <span>Uses Llama-3.3-70B model</span>
                  {(output || Object.keys(inputs).length > 0) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors font-bold uppercase tracking-wider"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </form>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
              Select a tool to configure parameter models.
            </div>
          )}
        </div>

        {/* ── COLUMN 3: Terminal Console Output Panel (Right Column) ───────── */}
        <div
          className={`col-span-1 lg:col-span-5 flex flex-col bg-[#0F172A] border border-slate-800 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden text-slate-100 ${
            mobileTab === "console" ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Browser-style Top Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3.5 flex items-center justify-between shrink-0 select-none">
            <div className="flex gap-1.5 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            
            <div className="bg-[#0F172A] border border-slate-800 rounded-lg px-3 py-1 text-[10px] text-slate-500 font-mono w-48 md:w-64 text-center truncate">
              console://zenovee.ai/sandbox/{tool?.id || "workspace"}
            </div>

            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">online</span>
            </div>
          </div>

          {/* Terminal Console Subheader (actions when output is present) */}
          <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-900/30 flex items-center justify-between text-[11px] shrink-0 text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span>Console Stream</span>
            </div>

            {output && !loading && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRaw((r) => !r)}
                  className="hover:text-teal-400 transition-colors"
                >
                  {showRaw ? "Rendered" : "Raw Source"}
                </button>
                <span>|</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-0.5 hover:text-teal-400 transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
                <span>|</span>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-0.5 hover:text-teal-400 transition-colors"
                >
                  Export
                </button>
              </div>
            )}
          </div>

          {/* Output Console Display Screen */}
          <div className="flex-1 overflow-y-auto p-5 font-mono text-[11px] leading-relaxed scrollbar-thin select-text">
            {/* Terminal logs list */}
            {consoleLogs.map((log, index) => (
              <div
                key={index}
                className={`mb-1.5 ${
                  log.startsWith("> [OK]")
                    ? "text-emerald-400 font-bold"
                    : log.startsWith("> [ERROR]")
                    ? "text-rose-400 font-bold animate-pulse"
                    : "text-slate-400"
                }`}
              >
                {log}
              </div>
            ))}

            {/* Simulated compiler stream status */}
            {phase === "initializing" && (
              <div className="flex items-center gap-2 text-teal-400 animate-pulse mt-4">
                <span className="w-3.5 h-3.5 border-2 border-teal-400 border-t-transparent animate-spin rounded-full" />
                <span>Streaming connection data logs...</span>
              </div>
            )}

            {/* Render Output Stream */}
            {(phase === "streaming" || phase === "done") && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                {error ? (
                  <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4 text-rose-300">
                    <div className="flex gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                      <div>
                        <h5 className="font-bold text-xs">Sandbox Exception</h5>
                        <p className="mt-1 text-[11px] leading-relaxed">{error}</p>
                      </div>
                    </div>
                  </div>
                ) : showRaw ? (
                  <pre className="whitespace-pre-wrap break-all text-slate-300">
                    {output}
                    {phase === "streaming" && <span className="w-1.5 h-3.5 bg-emerald-400 inline-block animate-pulse ml-0.5" />}
                  </pre>
                ) : (
                  <div className="prose prose-invert max-w-none text-slate-200 selection:bg-teal-900 selection:text-teal-100 prose-headings:text-slate-100 prose-p:leading-relaxed prose-code:text-teal-300 prose-code:bg-slate-900/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-ul:list-disc prose-ul:pl-4 prose-ol:list-decimal prose-ol:pl-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {output}
                    </ReactMarkdown>
                    {phase === "streaming" && <span className="w-1.5 h-3.5 bg-teal-400 inline-block animate-pulse ml-0.5" />}
                  </div>
                )}
              </div>
            )}

            {/* Idle status placeholder */}
            {phase === "idle" && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 py-16">
                <div className="w-12 h-12 rounded-xl border border-dashed border-slate-800 flex items-center justify-center mb-4">
                  <Terminal className="w-5 h-5 text-slate-600" />
                </div>
                <h5 className="font-bold text-xs text-slate-400">Sandbox Console Idle</h5>
                <p className="mt-1 text-[10px] leading-relaxed max-w-xs text-slate-500">
                  Select a tool module, configure parameters, and execute program thread. Outputs stream dynamically.
                </p>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>

          {/* Console Footer stats */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between shrink-0 select-none">
            <span>
              {phase === "done" && output ? `${wordCount} words` : "Time: 0.0s"}
            </span>
            <span>
              {phase === "done" && "Thread Ready"}
              {phase === "streaming" && "Streaming output..."}
              {phase === "initializing" && "Compiling thread..."}
              {phase === "idle" && "Idle"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
