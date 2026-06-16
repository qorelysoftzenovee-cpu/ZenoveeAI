"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Zap, LayoutGrid, Layers, LineChart, ChevronRight, Terminal, Copy, Play } from "lucide-react";

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

/* ── Embedded Keyframes ─────────────────────────────────────────────── */
function AnimationStyles() {
  return (
    <style jsx global>{`
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
    `}</style>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   INTERACTIVE AURORA + CONSTELLATION CANVAS
   A full-screen animated background with:
   • Flowing aurora light ribbons
   • Constellation dots connected by glowing lines
   • Mouse-reactive glow & particle attraction
   ══════════════════════════════════════════════════════════════════════ */
function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    let animId: number;
    let w = 0;
    let h = 0;

    const spacing = 55;
    const PARTICLE_COUNT = 85;
    const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899"];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      history: { x: number; y: number }[];
      maxHistory: number;
      color: string;
      speed: number;
      size: number;
    }

    const particles: Particle[] = [];

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      strength: number;
      speed: number;
    }

    let ripples: Ripple[] = [];

    function hexToRgba(hex: string, alpha: number) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          history: [],
          maxHistory: 6 + Math.floor(Math.random() * 8),
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: 0.6 + Math.random() * 1.4,
          size: 1.2 + Math.random() * 1.8,
        });
      }
    }

    function drawGrid(time: number) {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const cameraD = 800;
      const cx = w / 2;
      const cy = h / 2;

      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;

      const gridPoints: { px: number; py: number; z: number }[][] = [];
      for (let r = 0; r < rows; r++) {
        gridPoints[r] = [];
        for (let c = 0; c < cols; c++) {
          let bx = c * spacing - spacing;
          let by = r * spacing - spacing;

          let z = Math.sin(c * 0.18 + r * 0.18 + time * 0.0012) * 10;

          let dx = bx - mx;
          let dy = by - my;
          let dist = Math.sqrt(dx * dx + dy * dy);
          const warpRadius = 240;
          if (mx > 0 && my > 0 && dist < warpRadius) {
            const force = (1 - dist / warpRadius);
            z -= force * force * 70;
            const push = force * 24;
            bx -= (dx / dist) * push;
            by -= (dy / dist) * push;
          }

          for (const rip of ripples) {
            const rdx = bx - rip.x;
            const rdy = by - rip.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = Math.abs(rdist - rip.radius);
            if (diff < 90) {
              const thicknessFactor = (1 - diff / 90);
              const fade = (1 - rip.radius / rip.maxRadius);
              z += Math.sin((rdist - rip.radius) * 0.08) * rip.strength * thicknessFactor * fade;
            }
          }

          const scale = cameraD / (cameraD + z);
          const px = cx + (bx - cx) * scale;
          const py = cy + (by - cy) * scale;

          gridPoints[r].push({ px, py, z });
        }
      }

      ctx.strokeStyle = "rgba(99, 102, 241, 0.045)";
      ctx.lineWidth = 0.85;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(gridPoints[r][0].px, gridPoints[r][0].py);
        for (let c = 1; c < cols; c++) {
          ctx.lineTo(gridPoints[r][c].px, gridPoints[r][c].py);
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(gridPoints[0][c].px, gridPoints[0][c].py);
        for (let r = 1; r < rows; r++) {
          ctx.lineTo(gridPoints[r][c].px, gridPoints[r][c].py);
        }
        ctx.stroke();
      }

      if (mx > 0 && my > 0) {
        ctx.lineWidth = 1.6;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const pt = gridPoints[r][c];
            if (c < cols - 1) {
              const nextPt = gridPoints[r][c + 1];
              const midX = (pt.px + nextPt.px) / 2;
              const midY = (pt.py + nextPt.py) / 2;
              const dx = midX - mx;
              const dy = midY - my;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 185) {
                const alpha = (1 - dist / 185) * 0.2;
                ctx.beginPath();
                ctx.moveTo(pt.px, pt.py);
                ctx.lineTo(nextPt.px, nextPt.py);
                ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                ctx.stroke();
              }
            }
            if (r < rows - 1) {
              const nextPt = gridPoints[r + 1][c];
              const midX = (pt.px + nextPt.px) / 2;
              const midY = (pt.py + nextPt.py) / 2;
              const dx = midX - mx;
              const dy = midY - my;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 185) {
                const alpha = (1 - dist / 185) * 0.2;
                ctx.beginPath();
                ctx.moveTo(pt.px, pt.py);
                ctx.lineTo(nextPt.px, nextPt.py);
                ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                ctx.stroke();
              }
            }
          }
        }
      }
    }

    function drawParticles(time: number) {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const angle = Math.sin(p.x * 0.003 + time * 0.0003) * Math.cos(p.y * 0.003 - time * 0.0003) * Math.PI * 1.5;
        const fx = Math.cos(angle) * p.speed;
        const fy = Math.sin(angle) * p.speed;

        if (mx > 0 && my > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 260) {
            const force = (1 - dist / 260) * 0.7;
            const tx = -dy / dist;
            const ty = dx / dist;
            p.vx += (dx / dist * 0.12 + tx * 0.24) * force;
            p.vy += (dy / dist * 0.12 + ty * 0.24) * force;
          }
        }

        p.vx = p.vx * 0.93 + fx * 0.07;
        p.vy = p.vy * 0.93 + fy * 0.07;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > p.maxHistory) p.history.shift();

        if (p.history.length < 2) continue;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 0; i < p.history.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(p.history[i].x, p.history[i].y);
          ctx.lineTo(p.history[i + 1].x, p.history[i + 1].y);
          const alpha = (i / p.history.length) * 0.35;
          ctx.strokeStyle = hexToRgba(p.color, alpha);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, 0.6);
        ctx.fill();
      }
    }

    function animate(time: number) {
      ctx.clearRect(0, 0, w, h);

      ripples = ripples.map(rip => ({
        ...rip,
        radius: rip.radius + rip.speed
      })).filter(rip => rip.radius < rip.maxRadius);

      drawGrid(time);
      drawParticles(time);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const radialGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
        radialGlow.addColorStop(0, "rgba(99, 102, 241, 0.06)");
        radialGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.02)");
        radialGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mx, my, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    let lastMouseX = -1;
    let lastMouseY = -1;
    let lastMouseTime = 0;

    function onMouseMove(e: MouseEvent) {
      const now = performance.now();
      const mx = e.clientX;
      const my = e.clientY;
      mouseRef.current = { x: mx, y: my };

      if (lastMouseX !== -1) {
        const dx = mx - lastMouseX;
        const dy = my - lastMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dt = now - lastMouseTime;
        if (dt > 0) {
          const speed = dist / dt;
          if (speed > 1.8 && Math.random() < 0.15) {
            ripples.push({
              x: mx,
              y: my,
              radius: 0,
              maxRadius: 180,
              strength: Math.min(speed * 9, 30),
              speed: 4.5,
            });
          }
        }
      }
      lastMouseX = mx;
      lastMouseY = my;
      lastMouseTime = now;
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
      lastMouseX = -1;
      lastMouseY = -1;
    }

    function onClick(e: MouseEvent) {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(w, h) * 0.9,
        strength: 55,
        speed: 6.5,
      });
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("click", onClick);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

/* ── Section background blob (inline) ───────────────────────────────── */
function SectionBlob({ color, size, top, left, right, bottom, delay }: {
  color: string; size: number; top?: string; left?: string; right?: string; bottom?: string; delay?: string;
}) {
  return (
    <div style={{
      position: "absolute",
      width: size, height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color}, transparent 70%)`,
      filter: "blur(80px)",
      top, left, right, bottom,
      animation: "floatGentle 14s ease-in-out infinite",
      animationDelay: delay || "0s",
      pointerEvents: "none",
    }} />
  );
}

/* ── 3D Tilt Card Helper Component ───────────────────────────────────── */
function TiltCard({ children, className = "", style: externalStyle }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = ((yc - y) / yc) * 7;
    const angleY = ((x - xc) / xc) * 7;
    setStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.015, 1.015, 1.015)`,
      boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.12), 0 12px 24px -10px rgba(0, 0, 0, 0.05)",
      zIndex: 10,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      boxShadow: "none",
      transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.1s ease, box-shadow 0.1s ease",
        transformStyle: "preserve-3d",
        ...externalStyle,
        ...style
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/* ── Simulated Workspace Interactive Demo Player ──────────────────────── */
function InteractiveWorkspaceDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [phase, setPhase] = useState<"typing" | "generating" | "streaming" | "done">("typing");
  const [promptText, setPromptText] = useState("");
  const [outputText, setOutputText] = useState("");

  const demos = [
    {
      tab: "Marketing",
      tool: "Cold Email Writer",
      prompt: "Draft a high-converting cold email selling Zenovee AI to startup founders. Keep it short.",
      output: `Subject: 10 subscriptions, 1 tab.

Hi {Founder},

Quick question: how many separate monthly SaaS bills did you pay last month?

Zenovee AI consolidates 50 elite-tier AI tools into one secure workspace. No subscription lock-in. Just raw execution power.

Worth a quick 2-minute look?

Cheers,
Alex`,
      stats: { time: "1.1s", cost: "1 credit", tokens: "128 tokens" },
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      tab: "Legal",
      tool: "Contract Audit",
      prompt: "Analyze the liability clause in this draft service agreement and highlight potential risks.",
      output: `### ⚖️ Contract Audit Report

**Flag 1 — Uncapped Liability:** Section 8.2 states the vendor has unlimited liability. Recommend capping at 12x monthly fees.

**Flag 2 — Jurisdiction:** Governing law is set to Delaware but dispute resolution is in London. Align to single jurisdiction.

**Status:** Minor risks found. Revisions suggested.`,
      stats: { time: "1.4s", cost: "3 credits", tokens: "192 tokens" },
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      tab: "Financial",
      tool: "Runway Calculator",
      prompt: "Calculate runway for a team of 6 engineers with $450k capital and $30k/mo total burn rate.",
      output: `### 📊 Runway Analysis

- **Total Monthly Burn:** $30,000 / month
- **Projected Runway:** 15.0 Months
- **Optimization Tip:** Consolidating engineering tools to Zenovee AI saves $6,400/mo, extending runway by +2.7 months.`,
      stats: { time: "0.9s", cost: "2 credits", tokens: "94 tokens" },
      icon: <LineChart className="w-4 h-4" />
    },
    {
      tab: "Strategy",
      tool: "Objection Crusher",
      prompt: "How do we handle the customer objection: 'We already build our own AI wrappers in-house'?",
      output: `### 🎯 Objection Handler: In-House Wrappers

1. **Acknowledge:** "Building in-house is great for proprietary core logic..."
2. **Pivot:** "...but maintenance, API updates, and security auditing for 50 utility tools costs $15k+/yr of developer time."
3. **Close:** "Zenovee handles the utilities, so your team focuses on core IP."`,
      stats: { time: "1.2s", cost: "1 credit", tokens: "148 tokens" },
      icon: <Layers className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    let timer: any;
    const currentDemo = demos[activeTab];

    if (phase === "typing") {
      let charIdx = 0;
      setPromptText("");
      setOutputText("");
      const interval = setInterval(() => {
        if (charIdx < currentDemo.prompt.length) {
          setPromptText(currentDemo.prompt.slice(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(interval);
          timer = setTimeout(() => setPhase("generating"), 800);
        }
      }, 30);
      return () => clearInterval(interval);
    } else if (phase === "generating") {
      timer = setTimeout(() => {
        setPhase("streaming");
      }, 1400);
    } else if (phase === "streaming") {
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx < currentDemo.output.length) {
          const nextIndex = Math.min(charIdx + 4, currentDemo.output.length);
          setOutputText(currentDemo.output.slice(0, nextIndex));
          charIdx = nextIndex;
        } else {
          clearInterval(interval);
          timer = setTimeout(() => setPhase("done"), 600);
        }
      }, 12);
      return () => clearInterval(interval);
    } else if (phase === "done") {
      timer = setTimeout(() => {
        setPhase("typing");
        setActiveTab((prev) => (prev + 1) % demos.length);
      }, 3500);
    }

    return () => clearTimeout(timer);
  }, [phase, activeTab]);

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white shadow-2xl overflow-hidden text-left flex flex-col h-[520px] md:h-[460px]">
      {/* Browser Top Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-1.5 items-center">
          <span className="w-3 h-3 rounded-full bg-rose-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 font-mono w-60 md:w-80 text-center truncate">
          app.zenovee.ai/workspace/{demos[activeTab].tool.toLowerCase().replace(/ /g, "-")}
        </div>
        <div className="flex gap-2">
          <span className="w-4 h-1.5 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* Main Sandbox Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-36 md:w-48 bg-slate-50/50 border-r border-slate-200 p-3 flex flex-col gap-2 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">Console Tools</div>
          {demos.map((d, idx) => (
            <button
              key={d.tab}
              onClick={() => {
                if (activeTab !== idx) {
                  setActiveTab(idx);
                  setPhase("typing");
                }
              }}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                activeTab === idx
                  ? "bg-indigo-50 text-indigo-600 border border-indigo-100/50 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 border border-transparent"
              }`}
            >
              {d.icon}
              <span className="truncate">{d.tab}</span>
            </button>
          ))}
          <div className="mt-auto border-t border-slate-200/60 pt-3 px-2 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Credits: 940</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>API Gateway: Online</span>
            </div>
          </div>
        </div>

        {/* Panel View */}
        <div className="flex-1 flex flex-col md:flex-row min-w-0">
          {/* Input Panel */}
          <div className="w-full md:w-[45%] border-r border-slate-150 p-4 flex flex-col justify-between bg-white h-[200px] md:h-full shrink-0">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">
                  Active Tool
                </span>
                <span className="text-xs font-bold text-slate-800">{demos[activeTab].tool}</span>
              </div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">User Prompt</label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[90px] text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap select-none relative overflow-y-auto">
                {promptText}
                {phase === "typing" && <span className="w-1.5 h-3.5 bg-indigo-500 inline-block animate-pulse ml-0.5" />}
              </div>
            </div>

            <div className="flex gap-2 items-center justify-between border-t border-slate-100 pt-3 mt-2">
              <div className="flex gap-3 text-[10px] font-mono text-slate-400">
                <div>Cost: <span className="font-bold text-slate-600">{demos[activeTab].stats.cost}</span></div>
                <div>Est: <span className="font-bold text-slate-600">{demos[activeTab].stats.time}</span></div>
              </div>
              <button 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  phase === "generating"
                    ? "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse"
                    : "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                }`}
                disabled
              >
                {phase === "generating" ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Running
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    Execute
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex-1 bg-slate-900 text-slate-100 p-4 flex flex-col min-w-0 font-mono text-xs overflow-hidden relative">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.06),transparent_70%)] pointer-events-none" />
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 relative z-10">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Console Output</span>
              </div>
              <div className="flex gap-2">
                {phase === "done" && (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded flex items-center gap-1 animate-fade-in-up">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Ready · {demos[activeTab].stats.tokens}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed text-[11px] text-slate-300 relative z-10 select-all scrollbar-thin">
              {phase === "generating" ? (
                <div className="flex flex-col gap-2 text-indigo-400 animate-pulse mt-4">
                  <div>&gt; Initializing connection to Supabase API...</div>
                  <div>&gt; Authorizing with Zenovee credit token...</div>
                  <div>&gt; Dispatching payload request to Llama-3-70B model...</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-3 h-3 border-2 border-indigo-400 border-t-transparent animate-spin rounded-full" />
                    <span>Streaming response stream...</span>
                  </div>
                </div>
              ) : (
                <>
                  {outputText}
                  {phase === "streaming" && <span className="w-1.5 h-3 bg-emerald-400 inline-block animate-pulse ml-0.5" />}
                </>
              )}
            </div>

            <div className="border-t border-slate-800 pt-2 mt-3 flex items-center justify-between text-[10px] text-slate-500 relative z-10">
              <span>Time: {phase === "done" ? demos[activeTab].stats.time : phase === "streaming" ? "generating..." : "0.0s"}</span>
              {phase === "done" && (
                <button className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors">
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
  const heroRef = useRef<HTMLElement>(null);
  const statsReveal = useReveal();
  const matrixReveal = useReveal();
  const toolsReveal = useReveal();
  const ctaReveal = useReveal();

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Interactive Aurora + Constellation canvas background */}
        <AuroraCanvas />
        
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
      <section className="relative px-6 py-24 lg:px-8 max-w-7xl mx-auto z-10">
        <InteractiveWorkspaceDemo />
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
              <TiltCard
                key={group.title}
                className={`rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-8 shadow-sm transition-all duration-700 ${toolsReveal.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
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
              </TiltCard>
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
