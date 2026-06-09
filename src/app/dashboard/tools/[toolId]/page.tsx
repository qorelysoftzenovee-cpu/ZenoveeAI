"use client";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Copy, FileText, Loader2, Sparkles, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";

import { ToolErrorBoundary } from "@/components/tools/tool-error-boundary";
import { toolsConfig } from "@/utils/toolsConfig";

function CopyOutputButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
    >
      <Copy className="h-4 w-4" />
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function OutputViewport({ output }: { output: string }) {
  return (
    <article className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[#101522] p-6 shadow-2xl shadow-black/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
      <div className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-code:text-cyan-200 prose-pre:bg-transparent prose-pre:p-0">
        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-300">
          {output}
        </pre>
      </div>
    </article>
  );
}

export default function DynamicToolPage() {
  const params = useParams<{ toolId: string }>();
  const toolId = Array.isArray(params.toolId) ? params.toolId[0] : params.toolId;

  const tool = useMemo(
    () => toolsConfig.find((entry) => entry.id === toolId) ?? null,
    [toolId],
  );

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!tool) {
    return (
      <section className="rounded-[2rem] border border-slate-800 bg-[#101522] p-8 text-slate-100 shadow-2xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">404</p>
        <h2 className="mt-4 text-3xl font-semibold">Tool not found</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          The tool you requested does not exist in the current platform registry. Please return to the dashboard and choose a valid tool.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </section>
    );
  }

  const resolvedTool = tool;

  function updateValue(fieldId: string, value: string) {
    setFormValues((current) => ({
      ...current,
      [fieldId]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setOutput("");
    setShowCreditPopup(false);
    setToastMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/process-tool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolId: resolvedTool.id,
          tokenCost: resolvedTool.cost,
          inputs: formValues,
        }),
      });

      const data = (await response.json()) as { output?: string; error?: string };

      if (!response.ok) {
        if (data.error === "Insufficient Credits") {
          setShowCreditPopup(true);
          return;
        }

        setToastMessage("Engine busy, trying alternative node");
        setError(data.error || "Unable to run this tool right now.");
        return;
      }

      if (!data.output) {
        setToastMessage("Engine busy, trying alternative node");
        setError("The engine returned an empty response. Please try again.");
        return;
      }

      setOutput(data.output ?? "");
    } catch {
      setToastMessage("Engine busy, trying alternative node");
      setError("Something went wrong while contacting the AI engine. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const content = (
    <div className="space-y-6">
      {toastMessage ? (
        <div className="fixed right-6 top-6 z-50 rounded-2xl border border-amber-400/30 bg-[#120f06] px-4 py-3 text-sm font-medium text-amber-100 shadow-2xl shadow-black/30 backdrop-blur">
          {toastMessage}
        </div>
      ) : null}

      <section className="rounded-[2rem] border border-slate-800 bg-[#101522] p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Dynamic AI Tool
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{resolvedTool.name}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              {resolvedTool.description}
            </p>
          </div>

          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            Costs {resolvedTool.cost} Credits
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-[#101522] p-6 shadow-2xl shadow-black/20 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {resolvedTool.inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="mb-3 block text-sm font-medium text-slate-200">
                {input.label}
              </label>

              {input.type === "textarea" ? (
                <textarea
                  id={input.id}
                  value={formValues[input.id] ?? ""}
                  onChange={(event) => updateValue(input.id, event.target.value)}
                  required
                  rows={8}
                  placeholder={input.placeholder}
                  className="w-full rounded-lg border border-slate-700 bg-[#161C2A] p-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500"
                />
              ) : (
                <input
                  id={input.id}
                  type="text"
                  value={formValues[input.id] ?? ""}
                  onChange={(event) => updateValue(input.id, event.target.value)}
                  required
                  placeholder={input.placeholder}
                  className="w-full rounded-lg border border-slate-700 bg-[#161C2A] p-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500"
                />
              )}
            </div>
          ))}

          {error ? (
            <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-100">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running {resolvedTool.name}...
              </>
            ) : (
              `Execute Tool — Deducts ${resolvedTool.cost} Credits`
            )}
          </button>
        </form>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-[#101522] p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Generated output
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Professional tool result</h3>
          </div>
          {output ? <CopyOutputButton value={output} /> : null}
        </div>

        {isLoading ? (
          <div className="mt-8 flex min-h-[220px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-cyan-300/20 bg-[#161C2A] text-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-200" />
            <p className="mt-4 text-sm font-medium text-white/75">
              Building your professional output...
            </p>
            <p className="mt-2 text-sm text-white/45">
              The result will appear here once the AI engine completes processing.
            </p>
          </div>
        ) : output ? (
          <div className="relative">
            <div className="absolute right-4 top-4 z-10">
              <CopyOutputButton value={output} />
            </div>
            <div className="mb-5 flex items-center gap-2 pt-2 text-cyan-200">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Structured professional output</span>
            </div>
            <OutputViewport output={output} />
          </div>
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-700 bg-[#161C2A] p-8 text-center text-sm leading-7 text-slate-500">
            Submit the form to generate a premium AI result for this tool.
          </div>
        )}
      </section>

      {showCreditPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-rose-400/20 bg-[#08101f] p-8 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-3 text-rose-200">
                <TriangleAlert className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
                  Credit warning
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">Insufficient Credits</h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/70">
              You do not currently have enough credits to run this tool. Please top up your wallet and try again.
            </p>

            <button
              type="button"
              onClick={() => setShowCreditPopup(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-100"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );

  return <ToolErrorBoundary>{content}</ToolErrorBoundary>;
}
