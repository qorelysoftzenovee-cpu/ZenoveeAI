"use client";

import { useActionState, useState } from "react";

import {
  generateColdEmails,
  type ColdEmailState,
} from "@/app/dashboard/tools/cold-email/actions";

const initialState: ColdEmailState = {
  status: "idle",
};

function CopyButton({ value }: { value: string }) {
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
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function ColdEmailTool() {
  const [state, formAction, isPending] = useActionState(generateColdEmails, initialState);
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
              Hyper-Targeted Cold Outreach Personalizer
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
              Turn company context and a target persona into 3 sharp, conversion-focused cold email angles.
            </p>
          </div>
          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            Cost: 2 Credits
          </div>
        </div>

        <form action={formAction} className="mt-8 grid gap-6">
          <div>
            <label
              htmlFor="companyContext"
              className="mb-3 block text-sm font-medium text-white/80"
            >
              Company Description / Website Context
            </label>
            <textarea
              id="companyContext"
              name="companyContext"
              required
              defaultValue={state.companyContext}
              rows={8}
              placeholder="Paste the company overview, website summary, positioning, services, audience, or any relevant context here..."
              className="w-full rounded-[1.5rem] border border-white/10 bg-[#08101f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60"
            />
          </div>

          <div>
            <label
              htmlFor="targetPersona"
              className="mb-3 block text-sm font-medium text-white/80"
            >
              Target Persona Profile
            </label>
            <input
              id="targetPersona"
              name="targetPersona"
              type="text"
              required
              defaultValue={state.targetPersona}
              placeholder="e.g., Creative Director at Nike"
              className="w-full rounded-[1.5rem] border border-white/10 bg-[#08101f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60"
            />
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
            {isPending ? "Generating personalised emails..." : "Generate Personalised Emails"}
          </button>
        </form>
      </div>

      <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Generated output
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Your cold email options</h2>
          </div>
        </div>

        {state.emails?.length ? (
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {state.emails.map((email, index) => (
              <article
                key={`${index + 1}-${email.slice(0, 16)}`}
                className="rounded-[1.75rem] border border-white/10 bg-[#08101f] p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                      Option {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold">Email Draft</h3>
                  </div>
                  <CopyButton value={email} />
                </div>

                <pre className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-white/75">
                  {email}
                </pre>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/10 bg-[#08101f] p-8 text-center text-sm leading-7 text-white/45">
            Your three personalised email drafts will appear here after generation.
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
