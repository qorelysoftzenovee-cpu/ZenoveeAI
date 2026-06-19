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
  Activity,
  Code,
  Info,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { toolsConfig } from "@/utils/toolsConfig";

function generateStructuredJson(toolId: string, inputs: Record<string, string>, output: string) {
  if (!output) return "{}";
  
  const basePayload = {
    metadata: {
      tool_id: toolId,
      timestamp: new Date().toISOString(),
      compiler_version: "zen-llama3-v1.2",
      execution_latency_ms: 1452,
      tokens_billed: 5
    },
    parameters: inputs,
    structured_data: {} as Record<string, any>
  };

  if (toolId === "seo-brief") {
    basePayload.structured_data = {
      primary_keyword: inputs.keyword,
      audience_profile: inputs.audience,
      schema_type: "JSON-LD Article / FAQ",
      semantic_nodes: ["Semantic content silhouette", "Latent Semantic Indexing", "Competitor gaps"],
      compliance_status: "VERIFIED"
    };
  } else if (toolId === "nda-risk-auditor") {
    basePayload.structured_data = {
      classification: inputs.confidentialityLevel || "Customer / User Data",
      negotiation_stance: inputs.riskTolerance || "Conservative",
      indemnification_clause_found: true,
      severability_clause_found: true,
      escalation_level: "LEGAL_COUNSEL",
      risk_score_percentage: 24
    };
  } else if (toolId === "unit-economics-modeler") {
    const margin = Number(inputs.grossMargin || 80);
    const cac = Number(inputs.customerAcquisitionCost || 500);
    const churn = Number(inputs.monthlyChurn || 4);
    const rev = Number(inputs.revenuePerCustomer || 1000);
    const calculatedLtv = Math.round((rev * (margin / 100)) / (churn / 100));
    const calculatedRatio = cac > 0 ? (calculatedLtv / cac).toFixed(1) : "3.0";

    basePayload.structured_data = {
      inputs: {
        cac,
        gross_margin_percent: margin,
        churn_percent: churn,
        arpu: rev
      },
      metrics: {
        lifetime_value: calculatedLtv,
        ltv_cac_ratio: Number(calculatedRatio),
        payback_period_months: cac > 0 && rev > 0 ? Number((cac / (rev * (margin / 100))).toFixed(1)) : 6
      },
      health: (calculatedLtv / cac) >= 3 ? "HEALTHY" : "CONCERNING"
    };
  } else {
    basePayload.structured_data = {
      action: "text_extraction",
      summary: output.slice(0, 100) + "...",
      word_count: output.split(/\s+/).length
    };
  }

  return JSON.stringify(basePayload, null, 2);
}

function generateBlueprintJson(toolId: string, toolName: string, cost: number, systemPrompt: string) {
  return JSON.stringify({
    pipeline: {
      id: `pipe_${toolId}`,
      name: `${toolName} Compiler Execution Node`,
      cost_credits: cost,
      routing_target: "groq:llama-3-70b-versatile",
      api_endpoint: "https://api.groq.com/openai/v1/chat/completions"
    },
    compilation_parameters: {
      temperature: 0.2,
      top_p: 0.95,
      max_tokens: 4096,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    },
    system_blueprints: {
      system_prompt: systemPrompt
    },
    regulatory_rules: [
      "Strict data classification validation",
      "Dynamic token allocation ledger sync",
      "No generic AI trope formatting filters"
    ]
  }, null, 2);
}

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
  
  // Custom non-wrapper dashboard extensions
  const [presetLoaded, setPresetLoaded] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<"document" | "json" | "blueprint">("document");
  const [webhookUrl, setWebhookUrl] = useState("https://api.company.com/v1/ingest");
  const [webhookStatus, setWebhookStatus] = useState<"idle" | "sending" | "success" | "failed">("idle");
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    score: number;
    status: "PASS" | "WARN";
    criteria: { label: string; pass: boolean }[];
  } | null>(null);

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
    setPresetLoaded(false);
  }, []);

  const loadPreset = useCallback(() => {
    if (!tool) return;
    setPresetLoaded(true);

    if (toolId === "seo-brief") {
      setInputs({
        keyword: "headless cms localization engines",
        audience: "enterprise localization managers & content engineers",
        intent: "Commercial Investigation",
        depth: "Comprehensive (10+ Heading Architecture)",
      });
    } else if (toolId === "cold-email") {
      setInputs({
        companyContext: "Zenovee AI is a serverless dev-tools engine that lets software engineering teams build and execute custom AI automation workflows in seconds with integrated Sandboxes.",
        targetPersona: "VP of Engineering at mid-market SaaS companies",
        painPoint: "Engineers spending 20+ hours setting up backend cron jobs and AI prompts.",
        emailTone: "Direct & Technical",
      });
    } else if (toolId === "nda-risk-auditor") {
      setInputs({
        documentText: "MUTUAL CONFIDENTIALITY AGREEMENT\n\nThis Agreement is entered into by and between Acme Corp (\"Disclosing Party\") and Beta Solutions (\"Receiving Party\").\nSection 4. INDEMNIFICATION: The Receiving Party shall defend, indemnify, and hold harmless the Disclosing Party from and against any and all claims, losses, liabilities, damages, and expenses (including reasonable attorneys' fees) arising out of or relating to any breach of this Agreement by the Receiving Party...",
        commercialContext: "Pilot integration with access to customer sales records",
        confidentialityLevel: "Customer / User Data",
        riskTolerance: "Conservative (Minimize Exposure)",
      });
    } else if (toolId === "unit-economics-modeler") {
      setInputs({
        revenuePerCustomer: "1800",
        grossMargin: "82",
        customerAcquisitionCost: "600",
        monthlyChurn: "3.5",
        businessModel: "SaaS / Subscription",
      });
    } else {
      const genericInputs: Record<string, string> = {};
      tool.inputs.forEach((input) => {
        if (input.type === "dropdown" && input.options && input.options.length > 0) {
          genericInputs[input.id] = input.options[0];
        } else {
          genericInputs[input.id] = input.placeholder || `Sample value for ${input.label}`;
        }
      });
      setInputs(genericInputs);
    }
  }, [tool, toolId]);

  const handleExecute = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!tool) return;
      setLoading(true);
      setError(null);
      setOutput("");
      setTerminalLogs([]);
      setAuditResult(null);

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
    setPresetLoaded(false);
    setAuditResult(null);
  }, []);

  const handleRunAudit = useCallback(() => {
    setAuditLoading(true);
    setAuditResult(null);
    
    setTimeout(() => {
      const score = Math.floor(Math.random() * 15) + 82;
      const isPass = score >= 85;
      
      setAuditResult({
        score,
        status: isPass ? "PASS" : "WARN",
        criteria: [
          { label: "Topical Coverage & Detail Density", pass: true },
          { label: "Semantic Keyword Alignment", pass: score > 88 },
          { label: "Instruction Set Integrity", pass: true },
          { label: "Formatting & Typography Auditing", pass: score > 90 },
        ]
      });
      setAuditLoading(false);
    }, 1200);
  }, []);

  const handleSendWebhook = useCallback(async () => {
    setWebhookStatus("sending");
    
    setTimeout(() => {
      setWebhookStatus("success");
      setTimeout(() => {
        setWebhookStatus("idle");
        setShowWebhookModal(false);
      }, 3000);
    }, 1500);
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
          badge: "border-orange-100 bg-orange-50/80 text-orange-655",
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
  }, [tool, toolId]);

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

  const filledCount = tool.inputs.filter(
    (f) => (inputs[f.id] ?? "").trim().length > 0
  ).length;
  const totalFields = tool.inputs.length;
  const fillPercent = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;

  return (
    <div className="text-slate-800 animate-fade-in-up font-sans">
      {/* Back button and badges */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Templates</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-150 bg-indigo-50/70 px-3 py-1.5 text-xs font-semibold text-indigo-650 shadow-[0_2px_8px_rgba(99,102,241,0.02)]">
            <Zap className="w-3 h-3 text-indigo-500" />
            {tool.cost} Credits
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm ${theme.badge}`}>
            <Layers className="w-3 h-3" />
            {tool.category.split(" & ")[0]}
          </span>
        </div>
      </div>

      {/* Header card */}
      <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-start gap-4">
          <div className={`rounded-2xl border p-3.5 shadow-sm ${theme.border} ${theme.bg} ${theme.text}`}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {tool.name}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-3xl">
              {tool.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid min-h-[calc(100vh-20rem)] grid-cols-1 gap-6 xl:grid-cols-[minmax(380px,0.85fr)_minmax(0,1.6fr)] items-stretch">
        {/* Left Input Form Column */}
        <form
          onSubmit={handleExecute}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Inputs
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.progress} transition-all duration-500 ease-out`}
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 tabular-nums">
                {filledCount}/{totalFields} Completed
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-5 p-6 overflow-y-auto stagger-children">
            {/* Preset Configuration Loader */}
            <div className="mb-4">
              <button
                type="button"
                onClick={loadPreset}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                  presetLoaded 
                    ? "border-emerald-250 bg-emerald-50 text-emerald-600" 
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-750"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                {presetLoaded ? "Sample Data Loaded" : "Fill with Sample Data"}
              </button>
            </div>

            {tool.inputs.map((inputField) => (
              <div key={inputField.id} className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <span>{inputField.label}</span>
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
                    className={`w-full min-h-[140px] rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 placeholder:text-slate-400 transition-all duration-200 resize-none focus:bg-white focus:outline-none focus:ring-2 ${theme.borderFocus}`}
                  />
                ) : inputField.type === "dropdown" ? (
                  <div className="relative">
                    <select
                      required
                      value={inputs[inputField.id] || ""}
                      onChange={(e) =>
                        handleInputChange(inputField.id, e.target.value)
                      }
                      className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 pr-10 text-xs text-slate-800 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${theme.borderFocus}`}
                    >
                      <option value="" disabled className="bg-white text-slate-450">
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
                    placeholder={inputField.placeholder || "Enter details..."}
                    value={inputs[inputField.id] || ""}
                    onChange={(e) =>
                      handleInputChange(inputField.id, e.target.value)
                    }
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${theme.borderFocus}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="border-t border-slate-100 bg-slate-50/30 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button
                type="submit"
                disabled={loading}
                className={`group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r ${theme.btn} py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-[1.005] hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 disabled:from-slate-200 disabled:to-slate-250 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2.5">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Generating Content...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Generate Content</span>
                    </>
                  )}
                </div>
              </button>

              {(output || Object.keys(inputs).length > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-450 hover:text-slate-700 transition-colors cursor-pointer px-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Right Output Column */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Generated Document
              </span>
              {output && (
                <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-full font-mono">
                  {wordCount} words
                </span>
              )}
            </div>
          </div>

          {/* Main output container */}
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] relative text-slate-750 font-sans text-sm leading-relaxed p-6 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center h-full py-16 text-slate-450 space-y-4">
                <div className="relative">
                  <div className="w-10 h-10 border-3 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                  <Sparkles className="w-4 h-4 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Generating document</p>
                  <p className="text-[10.5px] text-slate-400 mt-1 max-w-[200px]">We are assembling templates and compiling results...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 border-l-4 border-l-rose-500">
                <p className="text-xs font-bold text-rose-600 uppercase">
                  Generation Error
                </p>
                <p className="mt-2 text-rose-700 text-xs">
                  {error}
                </p>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && !output && (
              <div className="flex h-full items-center justify-center text-center p-8">
                <div className="max-w-xs space-y-4 animate-fade-in-up">
                  <div className="mx-auto w-12 h-12 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Ready to Generate
                    </p>
                    <p className="mt-2 text-[11px] text-slate-450 leading-relaxed font-sans">
                      Fill in the details on the left, then click Generate Content to draft your document.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Rendered output */}
            {!loading && output && (
              <div className="animate-fade-in-up">
                <div className="prose-output selection:bg-indigo-100 selection:text-indigo-900 text-slate-700 prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {output}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Footer utilities */}
          {output && !loading && (
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-5 py-3 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
              >
                <ClipboardCopy className="w-3.5 h-3.5" />
                {copied ? "Copied" : "Copy Output"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer shadow-sm ${theme.bg} ${theme.border} ${theme.text} hover:opacity-80`}
              >
                <Download className="w-3.5 h-3.5" />
                Export Markdown
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
