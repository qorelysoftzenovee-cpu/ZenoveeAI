"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Zap, LayoutGrid, Layers, LineChart, ChevronRight } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

/* ── Intersection Observer hook for scroll reveal ───────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Animated Counter ───────────────────────────────────────────────── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Embedded Keyframes (can't be purged by Tailwind) ────────────────── */
function AnimationStyles() {
  return (
    <style jsx global>{`
      @keyframes blob1Move {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(80px, 50px) scale(1.15); }
        50% { transform: translate(-40px, 100px) scale(0.9); }
        75% { transform: translate(60px, -30px) scale(1.1); }
      }
      @keyframes blob2Move {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-70px, 40px) scale(1.1); }
        66% { transform: translate(50px, -60px) scale(0.9); }
      }
      @keyframes blob3Move {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(90px, -50px) scale(1.15); }
      }
      @keyframes blob4Move {
        0%, 100% { transform: translate(0, 0) scale(1); }
        40% { transform: translate(-50px, -70px) scale(1.12); }
        80% { transform: translate(60px, 40px) scale(0.88); }
      }
      @keyframes particleDrift {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10% { opacity: 0.7; }
        50% { transform: translateY(-150px) translateX(50px) scale(1.3); opacity: 0.3; }
        90% { opacity: 0; }
        100% { transform: translateY(-300px) translateX(-30px) scale(0.4); opacity: 0; }
      }
      @keyframes shimmerBtn {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes floatGentle {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(30px, -25px); }
      }
      @keyframes floatReverse {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-25px, 20px); }
      }
    `}</style>
  );
}

/* ── Animated Background Blobs (inline styles) ──────────────────────── */
function HeroBackground() {
  const blobBase: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    willChange: "transform",
    pointerEvents: "none",
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      {/* Blob 1 — Large indigo */}
      <div style={{ ...blobBase, width: 700, height: 700, top: "-15%", left: "5%", background: "radial-gradient(circle, rgba(129,140,248,0.45), transparent 70%)", animation: "blob1Move 12s ease-in-out infinite" }} />
      {/* Blob 2 — Violet right */}
      <div style={{ ...blobBase, width: 550, height: 550, top: "15%", right: "0%", background: "radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)", animation: "blob2Move 15s ease-in-out infinite" }} />
      {/* Blob 3 — Blue bottom */}
      <div style={{ ...blobBase, width: 500, height: 500, bottom: "-10%", left: "25%", background: "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)", animation: "blob3Move 18s ease-in-out infinite" }} />
      {/* Blob 4 — Pink accent */}
      <div style={{ ...blobBase, width: 400, height: 400, top: "35%", left: "-8%", background: "radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)", animation: "blob4Move 20s ease-in-out infinite" }} />
      {/* Particles */}
      <Particles />
    </div>
  );
}

/* ── Floating Particles (inline styles) ─────────────────────────────── */
function Particles() {
  // Generate stable positions using seed-like approach
  const particles = Array.from({ length: 25 }, (_, i) => ({
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 13) % 100}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${6 + (i % 5) * 2}s`,
    size: `${3 + (i % 3) * 2}px`,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.7), rgba(139,92,246,0.3))",
            animation: `particleDrift ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Floating blobs for section backgrounds ─────────────────────────── */
function SectionBlob({ color, size, top, left, right, bottom, delay }: {
  color: string; size: number; top?: string; left?: string; right?: string; bottom?: string; delay?: string;
}) {
  return (
    <div style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color}, transparent 70%)`,
      filter: "blur(80px)",
      top, left, right, bottom,
      animation: `floatGentle 14s ease-in-out infinite`,
      animationDelay: delay || "0s",
      pointerEvents: "none",
    }} />
  );
}

/* ── Tool Cards Data ────────────────────────────────────────────────── */
const showdownGroups = [
  { title: "Content & Marketing", desc: "Generate marketing materials in seconds with advanced AI.", bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100", icon: <Sparkles className="w-5 h-5" />, tools: toolsConfig.slice(0, 10) },
  { title: "Legal & Compliance", desc: "Audit contracts, policies, and regulatory documents instantly.", bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100", icon: <LayoutGrid className="w-5 h-5" />, tools: toolsConfig.slice(10, 20) },
  { title: "Financial Intelligence", desc: "Model unit economics, runway, and valuation scenarios.", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", icon: <LineChart className="w-5 h-5" />, tools: toolsConfig.slice(20, 30) },
  { title: "Sales & Strategy", desc: "Crush objections, qualify leads, and close deals faster.", bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", icon: <Layers className="w-5 h-5" />, tools: toolsConfig.slice(30, 40) },
];

const comparisonRows = [
  { feature: "Monthly Software Stack", elsewhere: "$117/mo across fragmented tools", here: "Included in one platform" },
  { feature: "Context Switching", elsewhere: "Constant tab switching across separate apps", here: "One secure, unified workspace" },
  { feature: "Usage Model", elsewhere: "Recurring subscriptions and upgrade fees", here: "Predictable credit system. No lock-in." },
  { feature: "Operational Speed", elsewhere: "Manual workflows and disconnected output", here: "Fast production runs, and automated delivery" },
];

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const statsReveal = useReveal();
  const matrixReveal = useReveal();
  const toolsReveal = useReveal();
  const ctaReveal = useReveal();

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
    });
  };

  return (
    <main className="min-h-screen bg-[#FAFBFE] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">
      <AnimationStyles />
      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-lg transition-all duration-700 ${heroReady ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm animate-logo-spin">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Zenovee AI</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/features" className="transition-colors hover:text-indigo-600 relative group">Features<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" /></Link>
            <Link href="/pricing" className="transition-colors hover:text-indigo-600 relative group">Pricing<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" /></Link>
            <Link href="/about" className="transition-colors hover:text-indigo-600 relative group">About<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" /></Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 md:block">Log in</Link>
            <Link href="/signup" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-95 hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated mesh gradient background */}
        <HeroBackground />

        {/* Mouse-following glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
            filter: "blur(120px)",
            zIndex: 0,
            transition: "transform 2s ease-out",
            pointerEvents: "none",
            left: "30%",
            top: "20%",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className={`mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/60 px-4 py-1.5 backdrop-blur-sm shadow-sm transition-all duration-700 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Live — Zenovee AI Platform 2.0</span>
          </div>
          
          {/* Title — staggered word reveal */}
          <h1 className={`mt-8 mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
             The Ultimate{" "}
             <span style={{ background: "linear-gradient(270deg, #6366f1, #8b5cf6, #a855f7, #6366f1)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientFlow 6s ease-in-out infinite", display: "inline-block" }}>AI Operating System</span>
          </h1>
          
          {/* Subtitle */}
          <p className={`mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl transition-all duration-1000 delay-400 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "400ms" }}>
            Replace 10 costly subscriptions with 50 elite-tier AI tools. One secure workspace for marketing, development, analytics, and business automation.
          </p>
          
          {/* CTA Buttons */}
          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "600ms" }}>
             <Link href="/signup" className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.6)] active:scale-95 hover:-translate-y-1">
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmerBtn 3s ease-in-out infinite" }} />
              Start Building Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/features" className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-white hover:text-slate-900 active:scale-95 hover:-translate-y-1 hover:shadow-md">
              View All 50 Tools
            </Link>
          </div>
          
          <p className={`mt-6 text-sm font-medium text-slate-500 transition-all duration-1000 ${heroReady ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "800ms" }}>
            🔒 Instant access · Secure processing · No credit card required
          </p>
        </div>

        {/* Animated down arrow */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 ${heroReady ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1200ms" }}>
          <div className="animate-bounce">
            <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
          </div>
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────────────────── */}
      <section ref={statsReveal.ref} className="border-y border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-200/60 sm:grid-cols-4">
            {[
              { label: "AI Tools", end: 50, suffix: "+" },
              { label: "Response Time", end: 3, suffix: "s" },
              { label: "Uptime", end: 99, suffix: ".9%" },
              { label: "Cost Saved", end: 85, suffix: "%" },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className={`py-8 text-center transition-all duration-700 ${statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {stat.label === "Response Time" ? "<" : ""}
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview ─────────────────────────────────── */}
      <section className="relative px-6 py-24 lg:px-8 max-w-7xl mx-auto">
        <div style={{ border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.4)", backdropFilter: "blur(20px)" }} className="rounded-2xl p-2 sm:p-3 shadow-2xl shadow-indigo-900/5">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200/40 bg-gradient-to-br from-slate-50 to-indigo-50/30 shadow-inner flex items-center justify-center relative">
             <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
               <SectionBlob color="rgba(129,140,248,0.35)" size={300} top="10%" left="20%" />
               <SectionBlob color="rgba(167,139,250,0.3)" size={200} bottom="15%" right="15%" delay="3s" />
               <SectionBlob color="rgba(236,72,153,0.2)" size={150} top="50%" left="60%" delay="5s" />
             </div>
             <div className="text-center p-8 z-10">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-6 animate-pulse-glow">
                  <LayoutGrid className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Unified Dashboard Interface</h3>
                <p className="text-slate-500 max-w-md mx-auto">Access all your AI tools, generation history, and billing in one seamless workspace.</p>
             </div>
          </div>
        </div>
      </section>

      {/* ── Value Matrix ──────────────────────────────────────── */}
      <section ref={matrixReveal.ref} className="border-y border-slate-200 bg-white relative overflow-hidden">
        {/* Flowing background */}
        <div style={{ position: "absolute", inset: 0, zIndex: -1, overflow: "hidden" }}>
          <SectionBlob color="rgba(224,231,255,0.6)" size={600} top="-30%" right="-10%" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${matrixReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Stop Paying for Fragmented Tools</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Zenovee AI collapses recurring software fatigue into one clean production system.</p>
          </div>
          
          <div className={`mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-1000 delay-300 ${matrixReveal.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}>
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] bg-slate-50 border-b border-slate-200">
              <div className="p-6 hidden md:block" />
              <div className="p-6 md:border-l border-slate-200"><h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Traditional Stack</h3></div>
              <div className="p-6 md:border-l border-slate-200 bg-indigo-50"><h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">Zenovee AI</h3></div>
            </div>
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] border-b border-slate-100 last:border-0 transition-all duration-700 ${matrixReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${500 + idx * 150}ms` }}
              >
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

      {/* ── Tool Categories Grid ──────────────────────────────── */}
      <section ref={toolsReveal.ref} className="py-24 relative overflow-hidden">
        <div style={{ position: "absolute", inset: 0, zIndex: -1, overflow: "hidden" }}>
          <SectionBlob color="rgba(199,210,254,0.5)" size={500} top="-10%" left="-10%" />
          <SectionBlob color="rgba(196,181,253,0.35)" size={400} bottom="-10%" right="-5%" delay="4s" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className={`mb-16 transition-all duration-1000 ${toolsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">50 Professional Utilities</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">Explore the production matrix built to replace scattered subscriptions across four high-output categories.</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {showdownGroups.map((group, gIdx) => (
              <div
                key={group.title}
                className={`tool-card rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-8 shadow-sm transition-all duration-700 ${toolsReveal.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
                style={{ transitionDelay: `${300 + gIdx * 200}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${group.bg} ${group.text} ${group.border} border transition-transform duration-300 hover:scale-110 hover:rotate-3`}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{group.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{group.desc}</p>
                  </div>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-2">
                  {group.tools.slice(0, 4).map((tool, tIdx) => (
                    <div
                      key={tool.id}
                      className={`rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:bg-indigo-50/50 hover:border-indigo-200 hover:-translate-y-1 hover:shadow-md group cursor-default ${toolsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: `${600 + gIdx * 200 + tIdx * 100}ms` }}
                    >
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
                  <Link href="/features" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors inline-flex items-center gap-1 group">
                    View all {group.tools.length} tools <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section ref={ctaReveal.ref} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-20 shadow-2xl sm:px-16 md:py-24 lg:flex lg:items-center lg:justify-between lg:px-24 text-center lg:text-left transition-all duration-1000 ${ctaReveal.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}>
            <div style={{ position: "absolute", inset: 0, zIndex: -1, overflow: "hidden" }}>
              <SectionBlob color="rgba(99,102,241,0.25)" size={600} top="-30%" left="-10%" />
              <SectionBlob color="rgba(139,92,246,0.2)" size={400} bottom="-20%" right="-5%" delay="3s" />
              <Particles />
            </div>
            
            <div className="lg:max-w-2xl relative z-10">
              <h2 className={`text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl transition-all duration-700 delay-300 ${ctaReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                Ready to scale your output?
              </h2>
              <p className={`mt-6 text-lg text-slate-300 transition-all duration-700 delay-500 ${ctaReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                Join professionals using Zenovee AI to automate their workflows. Secure your access today.
              </p>
            </div>
            
            <div className={`mt-10 lg:mt-0 lg:ml-8 relative z-10 flex justify-center lg:justify-end transition-all duration-700 delay-700 ${ctaReveal.visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
              <Link href="/signup" className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-sm transition-all hover:bg-indigo-50 hover:scale-105 hover:shadow-lg active:scale-95">
                Create Free Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
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
