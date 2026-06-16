import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap, LayoutGrid, Layers, LineChart } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

const showdownGroups = [
  {
    title: "Content & Marketing",
    description: "Generate marketing materials in seconds with advanced AI.",
    accent: "from-indigo-500 to-indigo-400",
    icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
    tools: toolsConfig.slice(0, 10),
  },
  {
    title: "Developer & Tech Utilities",
    description: "Clean, format, and audit code instantly.",
    accent: "from-violet-500 to-violet-400",
    icon: <LayoutGrid className="w-5 h-5 text-violet-500" />,
    tools: toolsConfig.slice(10, 20),
  },
  {
    title: "Data & SEO Analytics",
    description: "Audit web traffic metrics securely.",
    accent: "from-blue-500 to-blue-400",
    icon: <LineChart className="w-5 h-5 text-blue-500" />,
    tools: toolsConfig.slice(20, 30),
  },
  {
    title: "File Conversion & Media",
    description: "Process files with zero quality loss.",
    accent: "from-indigo-400 to-violet-400",
    icon: <Layers className="w-5 h-5 text-indigo-500" />,
    tools: toolsConfig.slice(30, 40),
  },
];

const comparisonRows = [
  {
    feature: "Monthly Software Stack",
    elsewhere: "$117/mo across fragmented tools",
    here: "Included in one platform",
  },
  {
    feature: "Context Switching",
    elsewhere: "Constant tab switching across separate apps",
    here: "One secure, unified workspace",
  },
  {
    feature: "Usage Model",
    elsewhere: "Recurring subscriptions and upgrade fees",
    here: "Predictable credit system. No lock-in.",
  },
  {
    feature: "Operational Speed",
    elsewhere: "Manual workflows and disconnected output",
    here: "Fast production runs, and automated delivery",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Zenovee AI</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/features" className="transition-colors hover:text-indigo-600">Features</Link>
            <Link href="/pricing" className="transition-colors hover:text-indigo-600">Pricing</Link>
            <Link href="/about" className="transition-colors hover:text-indigo-600">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 md:block">
              Log in
            </Link>
            <Link href="/signup" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[80px]" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 backdrop-blur-sm animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Zenovee AI Platform 2.0</span>
          </div>
          
          <h1 className="mt-8 mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
             The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI Operating System</span>
          </h1>
          
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Replace 10 costly subscriptions with 50 elite-tier AI tools. One secure workspace for marketing, development, analytics, and business automation.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
             <Link href="/signup" className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.6)] active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              Start Building Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/features" className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95">
              View All 50 Tools
            </Link>
          </div>
          
          <p className="mt-6 text-sm font-medium text-slate-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            🔒 Instant access. Secure processing. No credit card required to explore.
          </p>
        </div>
      </section>

      {/* ── Dashboard Preview (Glassmorphism) ─────────────────────────────── */}
      <section className="relative px-6 pb-24 lg:px-8 max-w-7xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="rounded-2xl border border-white/40 bg-white/40 p-2 shadow-2xl shadow-indigo-900/5 backdrop-blur-xl sm:p-4">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50 shadow-inner flex items-center justify-center relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
             <div className="text-center p-8 z-10">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-6">
                  <LayoutGrid className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Unified Dashboard Interface</h3>
                <p className="text-slate-500 max-w-md mx-auto">Access all your AI models, generation history, and billing in one seamless, high-performance workspace.</p>
             </div>
          </div>
        </div>
      </section>

      {/* ── Value Matrix ──────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Stop Paying for Fragmented Tools</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Zenovee AI collapses recurring software fatigue into one clean production system with a dramatically better price-to-output ratio.</p>
          </div>
          
          <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] bg-slate-50 border-b border-slate-200">
              <div className="p-6 hidden md:block" />
              <div className="p-6 md:border-l border-slate-200"><h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Traditional Stack</h3></div>
              <div className="p-6 md:border-l border-slate-200 bg-indigo-50"><h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">Zenovee AI</h3></div>
            </div>
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] border-b border-slate-100 last:border-0">
                <div className="p-6 flex items-center"><p className="font-semibold text-slate-900">{row.feature}</p></div>
                <div className="p-6 md:border-l border-slate-100 flex items-center"><p className="text-sm text-slate-600">{row.elsewhere}</p></div>
                <div className="p-6 md:border-l border-slate-100 bg-indigo-50/30 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <p className="text-sm font-medium text-slate-900">{row.here}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tool Categories Grid ──────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">50 Professional Utilities</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">Explore the production matrix built to replace scattered subscriptions across four high-output categories.</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {showdownGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${group.accent} bg-opacity-10`}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{group.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{group.description}</p>
                  </div>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-2">
                  {group.tools.slice(0, 4).map((tool) => (
                    <div key={tool.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50 hover:border-indigo-100 group">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">{tool.name}</h4>
                        <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          <Zap className="w-3 h-3 text-amber-500" /> {tool.cost}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">{tool.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/features" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors inline-flex items-center gap-1">
                    View all {group.tools.length} tools <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-20 shadow-2xl sm:px-16 md:py-24 lg:flex lg:items-center lg:justify-between lg:px-24 text-center lg:text-left">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.3),transparent_60%)]" />
            
            <div className="lg:max-w-2xl relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to scale your output?
              </h2>
              <p className="mt-6 text-lg text-slate-300">
                Join professionals using Zenovee AI to automate their workflows. Secure your access today with our launch trial pass.
              </p>
            </div>
            
            <div className="mt-10 lg:mt-0 lg:ml-8 relative z-10 flex justify-center lg:justify-end">
              <Link href="/signup" className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-sm transition-all hover:bg-indigo-50 hover:scale-105 active:scale-95">
                Create Free Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span className="text-lg font-bold text-slate-900">Zenovee AI</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Zenovee AI. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
