"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ShieldCheck, Zap } from "lucide-react";

import { SidebarNav } from "@/components/dashboard/SidebarNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      <div className="flex min-h-screen">
        {/* Left Sidebar Shell */}
        <aside className="hidden w-[300px] shrink-0 border-r border-slate-200/80 bg-white/80 backdrop-blur-xl xl:flex xl:flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {/* Clean Branding Slot ("Zenovee Free Suite") */}
          <div className="p-6 pb-4">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-2.5 text-indigo-600 shadow-sm transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5 animate-pulse text-indigo-500" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                  Zenovee Free Suite
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100/60 uppercase">
                    <ShieldCheck className="h-2.5 w-2.5" />
                    100% Free & Local
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Prominent Sidebar Search Bar */}
          <div className="px-6 pb-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 50+ free tools..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 transition-all shadow-inner"
              />
            </form>
          </div>

          {/* Sidebar Navigation Links (5 Core Free Domains) */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <SidebarNav />
          </div>

          {/* Dedicated Display Ad Container Slot (Pinned to Sidebar Bottom) */}
          <div className="mx-6 my-3 mt-auto">
            <div className="p-4 bg-slate-100/60 border border-slate-200/40 rounded-lg text-center text-xs text-slate-400 tracking-wider uppercase font-mono">
              ADVERTISEMENT
            </div>
          </div>

          {/* Footer Badge / Privacy Slot */}
          <div className="p-6 pt-2 border-t border-slate-100">
            <div className="rounded-xl border border-slate-200/60 bg-slate-50/60 p-3.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>Zero Server APIs</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Hosted on Cloudflare Pages. No signup or credit card required.
              </p>
            </div>
          </div>
        </aside>

        {/* Master Canvas Wrapper */}
        <section className="min-w-0 flex-1 bg-[#F8FAFC]">
          <div className="h-screen overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
            {/* Header Shell */}
            <header className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-md p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl tracking-tight">
                    Zenovee <span className="text-indigo-600">Client-Side Utilities</span>
                  </h1>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
                    High-volume, instant calculations and content generators running 100% in your browser.
                  </p>
                </div>
              </div>
            </header>

            {/* Dynamic View Content */}
            <div className="mt-6">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
