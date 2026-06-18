"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Zap, LayoutGrid, Layers, LineChart, ChevronRight, Terminal, Copy, Play } from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";
import { TiltCard } from "@/components/ui/TiltCard";

/* â”€â”€ Intersection Observer hook for scroll reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ Animated Counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ Embedded Keyframes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   INTERACTIVE AURORA + CONSTELLATION CANVAS
   A full-screen animated background with:
   â€¢ Flowing aurora light ribbons
   â€¢ Constellation dots connected by glowing lines
   â€¢ Mouse-reactive glow & particle attraction
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

    /* â”€â”€ Color palette: teal / coral / amber / electric-blue â”€â”€ */
    const palette = [
      { r: 20, g: 184, b: 166 },   // teal-500
      { r: 6, g: 182, b: 212 },    // cyan-500
      { r: 251, g: 113, b: 133 },  // rose-400
      { r: 251, g: 146, b: 60 },   // orange-400
      { r: 56, g: 189, b: 248 },   // sky-400
      { r: 167, g: 139, b: 250 },  // violet-400
      { r: 52, g: 211, b: 153 },   // emerald-400
    ];

    /* â”€â”€ Organic blobs (metaballs) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    interface Blob {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      baseRadius: number;
      color: typeof palette[0];
      phase: number;
      phaseSpeed: number;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
    }

    let blobs: Blob[] = [];
    const BLOB_COUNT = 8;

    /* â”€â”€ Light beams â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    interface Beam {
      angle: number;
      speed: number;
      width: number;
      length: number;
      color: typeof palette[0];
      opacity: number;
      cx: number; cy: number;
    }

    let beams: Beam[] = [];
    const BEAM_COUNT = 6;

    /* â”€â”€ Floating orbs (small accent particles) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    interface Orb {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      color: typeof palette[0];
      pulse: number;
      pulseSpeed: number;
    }

    let orbs: Orb[] = [];
    const ORB_COUNT = 40;

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

      // Initialize blobs
      blobs = [];
      for (let i = 0; i < BLOB_COUNT; i++) {
        const col = palette[i % palette.length];
        blobs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: 120 + Math.random() * 180,
          baseRadius: 120 + Math.random() * 180,
          color: col,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.008,
          orbitRadius: 30 + Math.random() * 60,
          orbitSpeed: 0.0006 + Math.random() * 0.0012,
          orbitAngle: Math.random() * Math.PI * 2,
        });
      }

      // Initialize beams
      beams = [];
      for (let i = 0; i < BEAM_COUNT; i++) {
        const col = palette[(i + 2) % palette.length];
        beams.push({
          angle: (Math.PI * 2 * i) / BEAM_COUNT,
          speed: 0.0003 + Math.random() * 0.0006,
          width: 60 + Math.random() * 120,
          length: Math.max(w, h) * 0.8,
          color: col,
          opacity: 0.015 + Math.random() * 0.02,
          cx: w * (0.3 + Math.random() * 0.4),
          cy: h * (0.2 + Math.random() * 0.3),
        });
      }

      // Initialize orbs
      orbs = [];
      for (let i = 0; i < ORB_COUNT; i++) {
        const col = palette[Math.floor(Math.random() * palette.length)];
        orbs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 1.5 + Math.random() * 3,
          color: col,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    }

    function drawBlobs(time: number) {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const b of blobs) {
        // Orbital motion
        b.orbitAngle += b.orbitSpeed * 16;
        const ox = Math.cos(b.orbitAngle) * b.orbitRadius;
        const oy = Math.sin(b.orbitAngle) * b.orbitRadius;

        b.x += b.vx + ox * 0.01;
        b.y += b.vy + oy * 0.01;

        // Breathing radius
        b.phase += b.phaseSpeed;
        b.radius = b.baseRadius + Math.sin(b.phase) * 30;

        // Soft boundary wrapping
        if (b.x < -b.radius) b.x = w + b.radius;
        if (b.x > w + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = h + b.radius;
        if (b.y > h + b.radius) b.y = -b.radius;

        // Mouse influence: push blobs away slightly for organic feel
        if (mx > 0 && my > 0) {
          const dx = b.x - mx;
          const dy = b.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 350 && dist > 0) {
            const force = (1 - dist / 350) * 0.5;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
          }
        }

        // Damping
        b.vx *= 0.992;
        b.vy *= 0.992;

        // Draw the blob with multi-layer gradient
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        gradient.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0.08)`);
        gradient.addColorStop(0.4, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0.04)`);
        gradient.addColorStop(0.7, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0.015)`);
        gradient.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner bright core
        const coreGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius * 0.35);
        coreGrad.addColorStop(0, `rgba(${Math.min(b.color.r + 60, 255)}, ${Math.min(b.color.g + 60, 255)}, ${Math.min(b.color.b + 60, 255)}, 0.06)`);
        coreGrad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }
    }

    function drawBeams(time: number) {
      ctx.save();
      for (const beam of beams) {
        beam.angle += beam.speed * 16;

        const endX = beam.cx + Math.cos(beam.angle) * beam.length;
        const endY = beam.cy + Math.sin(beam.angle) * beam.length;

        // Create tapered beam using a gradient along the beam
        const grad = ctx.createLinearGradient(beam.cx, beam.cy, endX, endY);
        grad.addColorStop(0, `rgba(${beam.color.r}, ${beam.color.g}, ${beam.color.b}, 0)`);
        grad.addColorStop(0.15, `rgba(${beam.color.r}, ${beam.color.g}, ${beam.color.b}, ${beam.opacity})`);
        grad.addColorStop(0.5, `rgba(${beam.color.r}, ${beam.color.g}, ${beam.color.b}, ${beam.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(${beam.color.r}, ${beam.color.g}, ${beam.color.b}, 0)`);

        ctx.save();
        ctx.translate(beam.cx, beam.cy);
        ctx.rotate(beam.angle);

        ctx.beginPath();
        ctx.moveTo(0, -beam.width / 2);
        ctx.lineTo(beam.length, -beam.width * 0.05);
        ctx.lineTo(beam.length, beam.width * 0.05);
        ctx.lineTo(0, beam.width / 2);
        ctx.closePath();

        ctx.restore();

        // Simpler approach: draw a wide, blurred line
        ctx.beginPath();
        ctx.moveTo(beam.cx, beam.cy);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${beam.color.r}, ${beam.color.g}, ${beam.color.b}, ${beam.opacity})`;
        ctx.lineWidth = beam.width;
        ctx.lineCap = "round";
        ctx.filter = "blur(40px)";
        ctx.stroke();
        ctx.filter = "none";
      }
      ctx.restore();
    }

    function drawOrbs(time: number) {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const orb of orbs) {
        orb.pulse += orb.pulseSpeed;
        const pulseFactor = 0.5 + Math.sin(orb.pulse) * 0.5;

        // Flow field movement
        const angle = Math.sin(orb.x * 0.002 + time * 0.0002) *
          Math.cos(orb.y * 0.002 - time * 0.00015) * Math.PI * 2;
        orb.vx = orb.vx * 0.95 + Math.cos(angle) * 0.15;
        orb.vy = orb.vy * 0.95 + Math.sin(angle) * 0.15;

        // Mouse attraction with swirl
        if (mx > 0 && my > 0) {
          const dx = mx - orb.x;
          const dy = my - orb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300 && dist > 0) {
            const force = (1 - dist / 300) * 0.3;
            // Tangential swirl + slight attraction
            orb.vx += (-dy / dist * 0.4 + dx / dist * 0.15) * force;
            orb.vy += (dx / dist * 0.4 + dy / dist * 0.15) * force;
          }
        }

        orb.x += orb.vx;
        orb.y += orb.vy;

        // Wrap
        if (orb.x < -10) orb.x = w + 10;
        if (orb.x > w + 10) orb.x = -10;
        if (orb.y < -10) orb.y = h + 10;
        if (orb.y > h + 10) orb.y = -10;

        const alpha = 0.2 + pulseFactor * 0.5;
        const r = orb.radius * (0.8 + pulseFactor * 0.4);

        // Glow
        const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r * 4);
        glow.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${alpha * 0.3})`);
        glow.addColorStop(1, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${alpha})`;
        ctx.fill();
      }

      // Draw connections between nearby orbs
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x;
          const dy = orbs[i].y - orbs[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            // Blend color from both orbs
            const mr = Math.round((orbs[i].color.r + orbs[j].color.r) / 2);
            const mg = Math.round((orbs[i].color.g + orbs[j].color.g) / 2);
            const mb = Math.round((orbs[i].color.b + orbs[j].color.b) / 2);
            ctx.beginPath();
            ctx.moveTo(orbs[i].x, orbs[i].y);
            ctx.lineTo(orbs[j].x, orbs[j].y);
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function drawMouseAura() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx <= 0 || my <= 0) return;

      // Multi-color mouse aura
      const layers = [
        { r: 20, g: 184, b: 166, radius: 180, opacity: 0.06 },
        { r: 251, g: 113, b: 133, radius: 120, opacity: 0.04 },
        { r: 56, g: 189, b: 248, radius: 250, opacity: 0.03 },
      ];

      for (const layer of layers) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, layer.radius);
        glow.addColorStop(0, `rgba(${layer.r}, ${layer.g}, ${layer.b}, ${layer.opacity})`);
        glow.addColorStop(0.5, `rgba(${layer.r}, ${layer.g}, ${layer.b}, ${layer.opacity * 0.4})`);
        glow.addColorStop(1, `rgba(${layer.r}, ${layer.g}, ${layer.b}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mx, my, layer.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate(time: number) {
      ctx.clearRect(0, 0, w, h);
      drawBeams(time);
      drawBlobs(time);
      drawOrbs(time);
      drawMouseAura();
      animId = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
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


/* â”€â”€ Section background blob (inline) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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



/* â”€â”€ Simulated Workspace Interactive Demo Player â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
      output: `### âš–ï¸ Contract Audit Report

**Flag 1 â€” Uncapped Liability:** Section 8.2 states the vendor has unlimited liability. Recommend capping at 12x monthly fees.

**Flag 2 â€” Jurisdiction:** Governing law is set to Delaware but dispute resolution is in London. Align to single jurisdiction.

**Status:** Minor risks found. Revisions suggested.`,
      stats: { time: "1.4s", cost: "3 credits", tokens: "192 tokens" },
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      tab: "Financial",
      tool: "Runway Calculator",
      prompt: "Calculate runway for a team of 6 engineers with $450k capital and $30k/mo total burn rate.",
      output: `### ðŸ“Š Runway Analysis

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
      output: `### ðŸŽ¯ Objection Handler: In-House Wrappers

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
                  ? "bg-teal-50 text-teal-600 border border-teal-100/50 shadow-sm"
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded">
                  Active Tool
                </span>
                <span className="text-xs font-bold text-slate-800">{demos[activeTab].tool}</span>
              </div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">User Prompt</label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[90px] text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap select-none relative overflow-y-auto">
                {promptText}
                {phase === "typing" && <span className="w-1.5 h-3.5 bg-teal-500 inline-block animate-pulse ml-0.5" />}
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
                    : "bg-teal-600 text-white shadow-sm hover:bg-teal-500"
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
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span>Console Output</span>
              </div>
              <div className="flex gap-2">
                {phase === "done" && (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded flex items-center gap-1 animate-fade-in-up">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Ready Â· {demos[activeTab].stats.tokens}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed text-[11px] text-slate-300 relative z-10 select-all scrollbar-thin">
              {phase === "generating" ? (
                <div className="flex flex-col gap-2 text-teal-400 animate-pulse mt-4">
                  <div>&gt; Initializing connection to Supabase API...</div>
                  <div>&gt; Authorizing with Zenovee credit token...</div>
                  <div>&gt; Dispatching payload request to Llama-3-70B model...</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-3 h-3 border-2 border-teal-400 border-t-transparent animate-spin rounded-full" />
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
                <button className="flex items-center gap-1 text-slate-400 hover:text-teal-400 transition-colors">
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

/* â”€â”€ Tool Cards Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const showdownGroups = [
  { title: "Content & Marketing", desc: "Generate marketing materials in seconds with advanced AI.", bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-100", icon: <Sparkles className="w-5 h-5" />, tools: toolsConfig.slice(0, 10) },
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN PAGE
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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
    <main className="min-h-screen bg-[#FAFBFE] text-slate-900 selection:bg-teal-100 selection:text-teal-900 font-sans overflow-x-hidden">
      <AnimationStyles />
      {/* â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-lg transition-all duration-700 ${heroReady ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-sm animate-logo-spin">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Zenovee AI</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/features" className="transition-colors hover:text-teal-600 relative group">Features<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" /></Link>
            <Link href="/pricing" className="transition-colors hover:text-teal-600 relative group">Pricing<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" /></Link>
            <Link href="/about" className="transition-colors hover:text-teal-600 relative group">About<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" /></Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-teal-600 md:block">Log in</Link>
            <Link href="/signup" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-95 hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* â”€â”€ Hero Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Interactive Aurora + Constellation canvas background */}
        <AuroraCanvas />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className={`mx-auto inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/60 px-4 py-1.5 backdrop-blur-sm shadow-sm transition-all duration-700 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">Live — Zenovee AI Platform 2.0</span>
          </div>
          
          {/* Title â€” staggered word reveal */}
          <h1 className={`mt-8 mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
             The Ultimate{" "}
             <span style={{ background: "linear-gradient(270deg, #14b8a6, #06b6d4, #fb7185, #f59e0b, #14b8a6)", backgroundSize: "400% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientFlow 8s ease-in-out infinite", display: "inline-block" }}>AI Operating System</span>
          </h1>
          
          {/* Subtitle */}
          <p className={`mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl transition-all duration-1000 delay-400 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "400ms" }}>
            Replace 10 costly subscriptions with 50 elite-tier AI tools. One secure workspace for marketing, development, analytics, and business automation.
          </p>
          
          {/* CTA Buttons */}
          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "600ms" }}>
             <Link href="/signup" className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] transition-all hover:from-teal-400 hover:to-cyan-400 hover:shadow-[0_0_60px_-15px_rgba(20,184,166,0.6)] active:scale-95 hover:-translate-y-1">
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmerBtn 3s ease-in-out infinite" }} />
              Start Building Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/features" className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-white hover:text-slate-900 active:scale-95 hover:-translate-y-1 hover:shadow-md">
              View All 50 Tools
            </Link>
          </div>
          
          <p className={`mt-6 text-sm font-medium text-slate-500 transition-all duration-1000 ${heroReady ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "800ms" }}>
            ðŸ”’ Instant access Â· Secure processing Â· No credit card required
          </p>
        </div>

        {/* Animated down arrow */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 ${heroReady ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1200ms" }}>
          <div className="animate-bounce">
            <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
          </div>
        </div>
      </section>

      {/* â”€â”€ Stats Strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      {/* â”€â”€ Dashboard Preview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative px-6 py-24 lg:px-8 max-w-7xl mx-auto z-10">
        <InteractiveWorkspaceDemo />
      </section>

      {/* â”€â”€ Value Matrix â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
              <div className="p-6 md:border-l border-slate-200 bg-teal-50"><h3 className="text-sm font-bold uppercase tracking-wider text-teal-600">Zenovee AI</h3></div>
            </div>
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] border-b border-slate-100 last:border-0 transition-all duration-700 ${matrixReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${500 + idx * 150}ms` }}
              >
                <div className="p-6 flex items-center"><p className="font-semibold text-slate-900">{row.feature}</p></div>
                <div className="p-6 md:border-l border-slate-100 flex items-center"><p className="text-sm text-slate-600">{row.elsewhere}</p></div>
                <div className="p-6 md:border-l border-slate-100 bg-teal-50/30 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <p className="text-sm font-medium text-slate-900">{row.here}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Tool Categories Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                      className={`rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:bg-teal-50/50 hover:border-teal-200 hover:-translate-y-1 hover:shadow-md group cursor-default ${toolsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: `${600 + gIdx * 200 + tIdx * 100}ms` }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-1">{tool.name}</h4>
                        <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          <Zap className="w-3 h-3 text-amber-500" /> {tool.cost}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">{tool.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/features" className="text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors inline-flex items-center gap-1 group">
                    View all {group.tools.length} tools <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
              <Link href="/signup" className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-sm transition-all hover:bg-teal-50 hover:scale-105 hover:shadow-lg active:scale-95">
                Create Free Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-600" />
            <span className="text-lg font-bold text-slate-900">Zenovee AI</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Zenovee AI. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-teal-600 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
