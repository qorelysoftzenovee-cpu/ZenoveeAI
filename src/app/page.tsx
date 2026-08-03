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
  Code2,
  Image as ImageIcon,
  PenTool,
  Cpu,
  Calculator,
  Layout,
  TerminalSquare
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="aurora-mesh absolute inset-0 -z-10 opacity-70">
            <div className="aurora-orb aurora-orb-1"></div>
            <div className="aurora-orb aurora-orb-2"></div>
            <div className="aurora-orb aurora-orb-3"></div>
            <div className="aurora-orb aurora-orb-4"></div>
            <div className="aurora-orb aurora-orb-5"></div>
          </div>
          
          <div className="particle-field">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
            <div className="flex justify-center gap-3 flex-wrap mb-8 anim-fade-up">
              <span className="badge badge-emerald">
                <Zap className="w-4 h-4 mr-1" /> Free Forever
              </span>
              <span className="badge badge-violet">
                <ShieldCheck className="w-4 h-4 mr-1" /> 100% Client-Side
              </span>
              <span className="badge badge-cyan">
                <Globe className="w-4 h-4 mr-1" /> No Signup Required
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] anim-fade-up delay-100 text-white">
              The Ultimate Free Tool Suite<br />
              <span className="gradient-text-animated mt-2 block">For Developers & Marketers.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed anim-fade-up delay-200">
              Instantly access {toolsConfig.length}+ ultra-fast, premium client-side utilities. 
              Zero server calls. Total privacy. Absolutely free.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4 anim-fade-up delay-300">
              <Link href="/dashboard" className="btn-primary flex items-center">
                Explore All {toolsConfig.length} Tools <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/features" className="btn-ghost">
                View Features
              </Link>
            </div>
          </div>
        </section>

        {/* SEARCH SECTION */}
        <section className="max-w-2xl mx-auto px-6 -mt-8 mb-20 relative z-20 anim-fade-up delay-400">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 transition-colors group-focus-within:text-violet-400" />
            <input
              type="text"
              className="search-input"
              placeholder="Search tools — try &quot;json format&quot;, &quot;utm builder&quot;, &quot;color picker&quot;..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* TOOLS GRID */}
        <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <TerminalSquare className="w-6 h-6 text-violet-400" />
                {searchQuery ? `Results (${filteredTools.length})` : 'Featured Tools'}
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                {searchQuery ? `Tools matching "${searchQuery}"` : 'Handpicked utilities by our community'}
              </p>
            </div>
            {!searchQuery && (
              <Link href="/dashboard" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors hidden sm:flex items-center gap-1 group">
                View all {toolsConfig.length} tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger">
              {filteredTools.map((tool) => (
                <Link href={`/dashboard/tools/${tool.id}`} key={tool.id} className="tool-card group anim-fade-up block">
                  <span className="badge badge-violet text-[10px] uppercase tracking-wider font-bold mb-3">
                    {tool.category}
                  </span>
                  <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-medium text-violet-400 gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    Launch Tool <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card-dark rounded-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 mb-4 ring-1 ring-white/10">
                <Search className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">No tools found</h3>
              <p className="text-zinc-400 mt-2">Try adjusting your search terms or browse all categories.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 px-6 py-2 bg-zinc-800 text-white rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors ring-1 ring-white/10"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="section-divider absolute top-0 left-6 right-6"></div>
          
          <div className="text-center mb-16 pt-8">
            <span className="badge badge-cyan mb-4">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Instant results. Zero friction.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="glass-card-dark rounded-2xl p-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:opacity-10 transition-opacity">
                <Search className="w-40 h-40 text-violet-500" />
              </div>
              <div className="relative z-10">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-400/50 to-violet-600/20 block mb-6">01</span>
                <h3 className="text-xl font-bold text-white mb-3">Find</h3>
                <p className="text-zinc-400">Search instantly through {toolsConfig.length}+ specialized utilities.</p>
              </div>
            </div>
            
            <div className="glass-card-dark rounded-2xl p-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:opacity-10 transition-opacity">
                <Cpu className="w-40 h-40 text-cyan-500" />
              </div>
              <div className="relative z-10">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400/50 to-cyan-600/20 block mb-6">02</span>
                <h3 className="text-xl font-bold text-white mb-3">Execute</h3>
                <p className="text-zinc-400">Run locally in your browser. No server delays, total privacy.</p>
              </div>
            </div>

            <div className="glass-card-dark rounded-2xl p-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:opacity-10 transition-opacity">
                <Zap className="w-40 h-40 text-emerald-500" />
              </div>
              <div className="relative z-10">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400/50 to-emerald-600/20 block mb-6">03</span>
                <h3 className="text-xl font-bold text-white mb-3">Build</h3>
                <p className="text-zinc-400">Copy output, download files, and get back to shipping.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="text-center mb-12">
            <span className="badge badge-emerald mb-4">Categories</span>
            <h2 className="text-3xl font-bold text-white">Built for your stack</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger">
            {categories.map((category) => (
              <Link 
                href={`/dashboard?category=${encodeURIComponent(category.name)}`} 
                key={category.name} 
                className="glass-card-dark rounded-xl p-5 text-center anim-fade-up transition-all group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{category.name}</h3>
                <span className="block text-xs text-zinc-500 mt-1">{category.count} tools</span>
              </Link>
            ))}
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="glass-card-dark rounded-3xl p-12 relative overflow-hidden border border-white/10">
            <div className="aurora-mesh absolute inset-0 opacity-40 -z-10">
               <div className="aurora-orb aurora-orb-1 scale-150"></div>
               <div className="aurora-orb aurora-orb-4 scale-150"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              <div>
                <div className="gradient-text text-4xl md:text-5xl font-extrabold mb-2">{toolsConfig.length}+</div>
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Free Tools</div>
              </div>
              <div>
                <div className="gradient-text text-4xl md:text-5xl font-extrabold mb-2">{categories.length}</div>
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Categories</div>
              </div>
              <div>
                <div className="gradient-text text-4xl md:text-5xl font-extrabold mb-2">0</div>
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Server Calls</div>
              </div>
              <div>
                <div className="gradient-text text-4xl md:text-5xl font-extrabold mb-2">100%</div>
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Private</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">Ready to upgrade your workflow?</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                Stop wasting time searching for simple utilities. Bookmark Zenovee and keep the ultimate developer suite one click away.
              </p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center bg-white text-violet-900 font-bold rounded-xl px-8 py-4 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
              >
                Launch Dashboard <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
