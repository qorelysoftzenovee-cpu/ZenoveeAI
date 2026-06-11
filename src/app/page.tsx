import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

const showdownGroups = [
  {
    title: "Category A: Content & Marketing",
    description: "Generate marketing materials in 30 seconds.",
    accent: "from-emerald-500 to-teal-500",
    tools: toolsConfig.slice(0, 15),
  },
  {
    title: "Category B: Developer & Tech Utilities",
    description: "Clean, format, and audit code instantly.",
    accent: "from-indigo-500 to-violet-500",
    tools: toolsConfig.slice(15, 30),
  },
  {
    title: "Category C: Data & SEO Analytics",
    description: "Audit web traffic metrics without data leaks.",
    accent: "from-cyan-500 to-sky-500",
    tools: toolsConfig.slice(30, 40),
  },
  {
    title: "Category D: File Conversion & Media",
    description: "Compress files with zero quality loss.",
    accent: "from-emerald-500 to-indigo-500",
    tools: toolsConfig.slice(40, 50),
  },
];

const comparisonRows = [
  {
    feature: "Monthly software stack",
    elsewhere: "$117/mo across fragmented tools",
    here: "$8 entry / lifetime access plans during launch",
  },
  {
    feature: "Tool switching",
    elsewhere: "Constant tab switching across separate apps",
    here: "One secure workspace with 50 professional utilities",
  },
  {
    feature: "Usage model",
    elsewhere: "Recurring subscriptions and separate upgrade fees",
    here: "Launch-week pricing with no recurring fee lock if secured now",
  },
  {
    feature: "Operational speed",
    elsewhere: "Manual workflows and disconnected output",
    here: "Fast production runs, automation, analytics, and delivery in one place",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-900">Pro-Suite 50</p>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/login" className="transition-colors hover:text-slate-900">Login</Link>
            <Link href="/signup" className="transition-colors hover:text-slate-900">Signup</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-semibold tracking-wide text-indigo-600">LAUNCH WEEK SPECIAL: Save 60% On The Ultimate Production Studio</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Replace 10 Costly Subscriptions. 50 Professional Tools. One Single Payment.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              Stop burning money on individual app fees. Access 50 elite-tier tools for automation, content engine, and analytics in one secure workspace. No recurring fees if you lock in during launch week.
            </p>
            <div className="mt-10">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-indigo-700 active:scale-[0.99]">
                Get Instant Access & Save 60%
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-sm font-medium text-slate-600">🔒 Instant access. Secure Razorpay Processing. 14-day money-back guarantee.</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">Launch Access Snapshot</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">A full production stack in one offer</h2>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600"><Sparkles className="h-5 w-5" /></div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["50 professional tools", "Automation and analytics workflows", "Secure workspace delivery", "Launch-week lifetime-value pricing"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Value Matrix</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-900">What You Pay Elsewhere vs What You Get Here</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">This offer is built to collapse recurring software fatigue into one clean production system with a dramatically better price-to-output ratio.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
            <div className="grid border-b border-slate-200 md:grid-cols-[1.1fr_1fr_1fr]">
              <div className="p-6" />
              <div className="border-t border-slate-200 p-6 md:border-l md:border-t-0"><p className="text-lg font-semibold text-slate-900">What You Pay Elsewhere ($117/mo)</p></div>
              <div className="border-t border-slate-200 bg-emerald-50/70 p-6 md:border-l md:border-t-0"><p className="text-lg font-semibold text-slate-900">What You Get Here ($8 Entry / Lifetime Access Plans)</p></div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.feature} className="grid border-t border-slate-200 md:grid-cols-[1.1fr_1fr_1fr]">
                <div className="p-6"><p className="font-semibold text-slate-900">{row.feature}</p></div>
                <div className="border-slate-200 p-6 md:border-l"><p className="text-sm leading-7 text-slate-600">{row.elsewhere}</p></div>
                <div className="border-slate-200 bg-emerald-50/70 p-6 md:border-l"><p className="text-sm leading-7 text-slate-700">{row.here}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">50-Tool Showdown Grid</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-900">One platform. Four high-output categories. Fifty revenue-grade utilities.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">Explore the production matrix built to replace scattered subscriptions and help teams move faster across content, development, analytics, and file operations.</p>
        </div>
        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {showdownGroups.map((group) => (
            <article key={group.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.05)] sm:p-8">
              <div className={`inline-flex rounded-full bg-gradient-to-r ${group.accent} px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white`}>{group.title}</div>
              <p className="mt-4 text-base font-medium text-slate-600">{group.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {group.tools.map((tool) => (
                  <div key={tool.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-900">{tool.name}</h3>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600 shadow-sm">{tool.cost}c</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-[2rem] border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-indigo-50 p-8 shadow-[0_30px_80px_rgba(16,185,129,0.10)] sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Founding Member Window</p>
                <h2 className="mt-4 text-4xl font-semibold text-slate-900">Only 250 Founding Member Slots Available at This Price. Lock in your access today.</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">Move before launch pricing disappears and secure immediate access to the full production studio while the founding rate is still open.</p>
              </div>
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-indigo-700 active:scale-[0.99]">
                Lock In Access Now
                <ShieldCheck className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
