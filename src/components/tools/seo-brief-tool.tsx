"use client";

import { useActionState, useState } from "react";

import {
  generateSeoBrief,
  type SeoBriefState,
} from "@/app/dashboard/tools/seo-brief/actions";

const initialState: SeoBriefState = { status: "idle" };

function CopyBriefButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
    >
      {copied ? "Copied" : "Copy Brief"}
    </button>
  );
}

export function SeoBriefTool() {
  const [state, formAction, isPending] = useActionState(generateSeoBrief, initialState);
  const [dismissedModal, setDismissedModal] = useState(false);
  const showModal = Boolean(state.showInsufficientCreditsModal) && !dismissedModal;

  return (
    <>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Live tool
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Programmatic SEO Data-Brief Generator
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
              Generate a structured SEO strategy brief with silhouettes, LSI clusters, content gaps, and implementation-ready headers.
            </p>
          </div>
          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            Cost: 5 Credits
          </div>
        </div>

        <form action={formAction} className="mt-8 grid gap-6">
          <div>
            <label htmlFor="seedKeyword" className="mb-3 block text-sm font-medium text-white/80">
              Target Seed Keyword
            </label>
            <input
              id="seedKeyword"
              name="seedKeyword"
              type="text"
              required
              defaultValue={state.seedKeyword}
              placeholder="e.g., ai sales automation"
              className="w-full rounded-[1.5rem] border border-white/10 bg-[#08101f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <label htmlFor="vertical" className="mb-3 block text-sm font-medium text-white/80">
                Target Vertical / Industry
              </label>
              <input
                id="vertical"
                name="vertical"
                type="text"
                required
                defaultValue={state.vertical}
                placeholder="e.g., SaaS for logistics teams"
                className="w-full rounded-[1.5rem] border border-white/10 bg-[#08101f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60"
              />
            </div>

            <div>
              <label htmlFor="competitorDomain" className="mb-3 block text-sm font-medium text-white/80">
                Competitor Domain Root URL
              </label>
              <input
                id="competitorDomain"
                name="competitorDomain"
                type="url"
                required
                defaultValue={state.competitorDomain}
                placeholder="https://competitor.com"
                className="w-full rounded-[1.5rem] border border-white/10 bg-[#08101f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60"
              />
            </div>
          </div>

          {state.message && !state.showInsufficientCreditsModal ? (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                state.status === "success"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                  : "border-rose-400/30 bg-rose-400/10 text-rose-100"
              }`}
            >
              {state.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            onClick={() => setDismissedModal(false)}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <span className="flex items-center gap-3">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                Generating strategy brief...
              </span>
            ) : (
              "Generate SEO Brief"
            )}
          </button>
        </form>
      </div>

      <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Generated strategy
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Programmatic SEO brief</h2>
          </div>
          {state.brief ? <CopyBriefButton value={state.brief} /> : null}
        </div>

        {state.brief ? (
          <article className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#08101f] p-6">
            <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-white/75">
              {state.brief}
            </pre>
          </article>
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/10 bg-[#08101f] p-8 text-center text-sm leading-7 text-white/45">
            Your markdown SEO brief will appear here once processing completes.
          </div>
        )}
      </section>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-rose-400/20 bg-[#08101f] p-8 shadow-2xl shadow-black/40">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
              Billing notice
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Insufficient Credits</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              You do not currently have enough credits to run this tool. Please top up your credits and try again.
            </p>
            <button
              type="button"
              onClick={() => setDismissedModal(true)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-100"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
