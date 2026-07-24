"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Search, 
  Cpu, 
  Clock, 
  FileCode, 
  Layers, 
  Play, 
  EyeOff, 
  Terminal,
  Activity,
  Heart
} from "lucide-react";
import { toolsConfig } from "@/utils/toolsConfig";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return toolsConfig.slice(0, 12); // Show top trending tools by default
    return toolsConfig.filter(
      (t) =>
        t.title?.toLowerCase().includes(q) ||
        t.name?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q) ||
        t.id?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    const map: Record<string, number> = {};
    toolsConfig.forEach(t => {
      map[t.category] = (map[t.category] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans relative overflow-hidden antialiased">
      {/* Decorative Aurora Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-2 text-indigo-650 shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="h-4.5 w-4.5 text-indigo-605" />
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-lg">Zenovee Free Suite</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/features" className="text-sm font-bold text-slate-700 hover:text-indigo-650 transition-colors uppercase tracking-wider">Features</Link>
            <Link href="/about" className="text-sm font-bold text-slate-700 hover:text-indigo-650 transition-colors uppercase tracking-wider">About</Link>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4.5 py-2.5 rounded-xl shadow-sm transition-all uppercase tracking-wider"
            >
              Launch Workspace
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Hero & Content */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10">
        
        {/* Value Badges Block */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-250 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-600 shadow-sm uppercase tracking-wider font-mono">
            <Zap className="w-3.5 h-3.5" /> 100% Free Forever
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-150 bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-600 shadow-sm uppercase tracking-wider font-mono">
            <ShieldCheck className="w-3.5 h-3.5" /> Browser-Local Privacy
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-150 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wider font-mono">
            <EyeOff className="w-3.5 h-3.5" /> Zero Registration Required
          </span>
        </div>

        {/* Hero Copy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-[1.15]">
            50+ Free Online Developer & Marketing Tools — <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-650 to-blue-600">No Signup, No Credit Card, 100% Instant.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-semibold">
            Run high-performance scripts, generators, formatters, and calculators directly in your browser. Complete privacy with zero server logging.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link 
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all hover:scale-[1.01]"
            >
              Browse All 50+ Free Tools
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Interactive Search Console */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-2.5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search base64 codec, webp converter, UTM builder..."
              className="flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-555 outline-none pr-4 font-semibold"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-650 px-2 py-1 rounded hover:bg-slate-50"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Real-time Dynamic Grid Preview */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                {searchQuery ? `Search Results (${filteredTools.length})` : "Trending Utilities Grid"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery ? "Showing matching tools ready for local execution." : "Quick-launch tools running 100% locally in browser memory."}
              </p>
            </div>
            {!searchQuery && (
              <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider font-mono">
                Total Catalog: {toolsConfig.length} Utilities
              </span>
            )}
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/dashboard/tools/${tool.id}`}
                  className="group block rounded-2xl border border-slate-250/60 bg-white p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/50">
                      {tool.category}
                    </span>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-1.5 text-slate-400 group-hover:text-indigo-650 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-950 group-hover:text-indigo-650 transition-colors leading-snug">
                    {tool.title || tool.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 max-w-md mx-auto">
              <Terminal className="w-10 h-10 text-slate-350 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800">No Matching Utilities Found</h3>
              <p className="text-xs text-slate-400 mt-1 px-4 leading-relaxed">
                Try searching for a different keyword or category, or browse the entire free workspace directory.
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 inline-flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs font-bold text-slate-700 transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Categories Bento Board */}
        <div className="border-t border-slate-200/80 pt-16">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-indigo-600 mb-12">
            Multi-Domain Coverage Breakdown
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((cat, idx) => (
              <Link 
                key={idx}
                href={`/dashboard?category=${encodeURIComponent(cat.name)}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center hover:border-indigo-250 hover:shadow-sm transition-all block group"
              >
                <span className="block font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  {cat.name}
                </span>
                <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-mono">
                  {cat.count} Utilities
                </span>
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200/80 bg-white/50 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Zenovee Free Suite. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for a subscription-free web.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
