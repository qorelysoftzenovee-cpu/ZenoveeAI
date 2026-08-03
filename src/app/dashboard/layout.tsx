"use client"
import SidebarNav from '@/components/dashboard/SidebarNav'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Terminal, Menu, X, ArrowLeft } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex flex-col">
      <div className="flex flex-1 min-h-screen overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="hidden xl:flex w-[280px] shrink-0 flex-col border-r border-white/5 bg-zinc-950/80 backdrop-blur-xl z-20">
          <div className="p-6 pb-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-violet-500/10 text-violet-400 rounded-xl p-2.5 ring-1 ring-violet-500/20 shadow-[0_0_15px_rgba(124,58,237,0.15)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all duration-300">
                <Terminal size={20} />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">Zenovee</h1>
                <span className="badge badge-violet text-[10px]">Suite</span>
              </div>
            </Link>
          </div>
          
          <div className="px-5 pb-3">
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="w-full text-xs py-2.5 pl-9 pr-4 rounded-xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
              />
            </form>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 custom-scroll">
            <SidebarNav />
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="min-w-0 flex-1 flex flex-col h-screen relative">
          {/* Background Mesh */}
          <div className="aurora-mesh absolute inset-0 pointer-events-none opacity-20 z-0">
            <div className="aurora-orb aurora-orb-1 opacity-20" />
            <div className="aurora-orb aurora-orb-4 opacity-10" />
          </div>

          <header className="glass-nav-dark sticky top-0 z-40 px-6 md:px-10 py-4 flex items-center justify-between border-b border-white/5 shadow-sm">
            <div className="flex items-center gap-1.5 xl:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                <h1 className="font-bold text-lg text-white tracking-tight">Zenovee</h1>
                <span className="gradient-text font-bold">Suite</span>
              </div>
            </div>
            
            <div className="hidden xl:flex items-center gap-1.5">
              <h1 className="font-bold text-lg text-white tracking-tight">Zenovee</h1>
              <span className="gradient-text font-bold">Suite</span>
            </div>

            <Link href="/" className="text-sm text-zinc-400 hover:text-violet-400 transition-colors flex items-center gap-2">
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </header>

          <main className="p-6 md:p-10 pt-6 flex-1 overflow-y-auto custom-scroll relative z-10">
            {children}
          </main>
        </div>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="relative w-[280px] h-full flex flex-col border-r border-white/5 bg-zinc-950 anim-slide-right">
            <div className="p-6 pb-4 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="bg-violet-500/10 text-violet-400 rounded-xl p-2.5 ring-1 ring-violet-500/20">
                  <Terminal size={20} />
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-white tracking-tight">Zenovee</h1>
                  <span className="badge badge-violet text-[10px]">Suite</span>
                </div>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="px-5 pb-3">
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                <input 
                  type="text" 
                  placeholder="Search tools..." 
                  className="w-full text-xs py-2.5 pl-9 pr-4 rounded-xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
                />
              </form>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 custom-scroll">
              <SidebarNav />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
