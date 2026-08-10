"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { toolsConfig } from '@/utils/toolsConfig';
import { 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Search, 
  X,
  Cpu,
  TerminalSquare,
  Layers,
  Star
} from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!searchQuery) return toolsConfig.slice(0, 8);
    const query = searchQuery.toLowerCase();
    return toolsConfig.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    toolsConfig.forEach((tool) => {
      categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
    });
    return Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const categoryIcons: Record<string, string> = {
    "Developer & Tech Utilities": "⚙️",
    "Media, Design & Productivity": "🎨",
    "Calculators & Mathematics": "🔢",
    "Network & Server Utilities": "🌐",
    "Growth Marketing & SEO Suite": "📈",
    "Financial & Investment Engines": "💰",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-20">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 dot-grid opacity-60 -z-10" />

          {/* Aurora orbs */}
          <div className="aurora-mesh absolute inset-0 -z-10 opacity-60">
            <div className="aurora-orb aurora-orb-1" />
            <div className="aurora-orb aurora-orb-2" />
            <div className="aurora-orb aurora-orb-3" />
          </div>

          {/* Floating particles */}
          <div className="particle-field">
            {Array.from({ length: 16 }).map((_, i) => {
              const pr = (seed: number) => ((seed * 9301 + 49297) % 233280) / 233280;
              return (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${pr(i+1)*100}%`,
                    top:  `${pr(i+2)*100}%`,
                    animationDelay: `${pr(i+3)*5}s`,
                    animationDuration: `${3 + pr(i+4)*4}s`
                  }}
                />
              );
            })}
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
            {/* Trust badges */}
            <div className="flex justify-center gap-3 flex-wrap mb-8 anim-fade-up">
              <span className="badge badge-emerald">
                <Zap className="w-3.5 h-3.5" /> Free Forever
              </span>
              <span className="badge badge-blue">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side
              </span>
              <span className="badge badge-teal">
                <Globe className="w-3.5 h-3.5" /> No Signup Required
              </span>
              <span className="badge badge-orange">
                <Star className="w-3.5 h-3.5" /> {toolsConfig.length}+ Tools
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.08] anim-fade-up delay-100 text-slate-900">
              The Ultimate Free<br />
              <span className="gradient-text-animated">Developer Toolkit.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed anim-fade-up delay-200 font-medium">
              {toolsConfig.length}+ ultra-fast, premium browser tools for developers, designers &amp; marketers.
              Zero server calls. Total privacy. Always free.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4 anim-fade-up delay-300">
              <Link href="/dashboard" className="btn-primary">
                Explore All {toolsConfig.length} Tools <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/features" className="btn-ghost">
                View All Features
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="mt-12 flex justify-center gap-8 anim-fade-up delay-400">
              {[
                { label: "Tools Available", value: `${toolsConfig.length}+` },
                { label: "Categories", value: `${categories.length}` },
                { label: "Server Calls", value: "Zero" },
                { label: "Cost", value: "Free" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-slate-900">{s.value}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEARCH ───────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 -mt-4 mb-16 md:mb-24 relative z-20 anim-fade-up delay-400">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              className="search-input"
              placeholder='Search tools — try "json format", "qr code", "color picker"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-100"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* ── TOOL GRID ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-32 relative z-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <TerminalSquare className="w-6 h-6 text-blue-600" />
                {searchQuery ? `Results (${filteredTools.length})` : 'Featured Tools'}
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1.5">
                {searchQuery ? `Matching "${searchQuery}"` : 'Handpicked utilities by our community'}
              </p>
            </div>
            {!searchQuery && (
              <Link
                href="/dashboard"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors hidden sm:flex items-center gap-1 group"
              >
                View all {toolsConfig.length} tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger">
              {filteredTools.map((tool) => (
                <Link href={`/dashboard/tools/${tool.id}`} key={tool.id} className="tool-card group block">
                  <span className="badge badge-blue text-[10px] uppercase tracking-wider font-bold mb-3">
                    {tool.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-2 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 font-medium leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-bold text-blue-600 gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    Launch Tool <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 ring-1 ring-blue-200">
                <Search className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No tools found</h3>
              <p className="text-slate-500 font-medium mt-2">Try adjusting your search or browse all categories.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="badge badge-blue mb-4">How It Works</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                Instant results. <span className="gradient-text">Zero friction.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium max-w-xl mx-auto">
                Everything runs in your browser — no waiting, no data leaving your device.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: <Search className="w-7 h-7 text-blue-600" />,
                  title: "Find",
                  desc: `Search instantly through ${toolsConfig.length}+ specialized utilities.`,
                  color: "blue",
                },
                {
                  step: "02",
                  icon: <Cpu className="w-7 h-7 text-teal-600" />,
                  title: "Execute",
                  desc: "Everything runs locally in your browser. No server delays, total privacy.",
                  color: "teal",
                },
                {
                  step: "03",
                  icon: <Zap className="w-7 h-7 text-orange-500" />,
                  title: "Build",
                  desc: "Copy output, download files, and get back to shipping faster.",
                  color: "orange",
                },
              ].map((item) => (
                <div key={item.step} className="card-pro p-8 text-center group">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${
                    item.color === "blue" ? "bg-blue-50" : item.color === "teal" ? "bg-teal-50" : "bg-orange-50"
                  }`}>
                    {item.icon}
                  </div>
                  <div className={`text-5xl font-black mb-4 ${
                    item.color === "blue" ? "text-blue-100" : item.color === "teal" ? "text-teal-100" : "text-orange-100"
                  }`}>{item.step}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <span className="badge badge-teal mb-4">Categories</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              Built for your <span className="gradient-text">entire stack.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 stagger">
            {categories.map((category) => (
              <Link
                href={`/dashboard?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="card-pro p-5 text-center group hover:border-blue-200"
              >
                <div className="text-3xl mb-3">{categoryIcons[category.name] || "🔧"}</div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {category.name}
                </h3>
                <span className="block text-xs font-semibold text-slate-400 mt-1.5">
                  {category.count} tools
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FEATURES STRIP ───────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-200 py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, title: "100% Private", desc: "No data sent to any server" },
                { icon: <Zap className="w-6 h-6 text-orange-500" />, title: "Instant Speed", desc: "All processing is in your browser" },
                { icon: <Globe className="w-6 h-6 text-blue-600" />, title: "No Signup", desc: "Just open and use any tool" },
                { icon: <Layers className="w-6 h-6 text-indigo-600" />, title: "Always Free", desc: `${toolsConfig.length}+ tools, zero paywalls` },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{f.title}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ──────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative orbs inside CTA */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            <div className="absolute inset-0 dot-grid opacity-10" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-white/20">
                <Zap className="w-3.5 h-3.5" /> Ready to get started?
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                Upgrade your workflow today.
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10 font-medium">
                Stop switching between tabs looking for simple utilities.
                Bookmark Zenovee and keep every tool one click away — forever free.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center bg-white text-blue-700 font-black rounded-2xl px-8 py-4 hover:bg-blue-50 active:scale-95 transition-all shadow-lg hover:shadow-xl text-base"
                >
                  Launch Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center bg-white/10 border border-white/25 text-white font-bold rounded-2xl px-8 py-4 hover:bg-white/20 transition-all text-base"
                >
                  See All Features
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
