"use client"
import { toolsConfig } from '@/utils/toolsConfig'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { LayoutGrid, PenTool, Image, FileText, Code, Box, LineChart, History, PieChart, Sparkles } from 'lucide-react'
import { Suspense, useMemo } from 'react'

const categoryMeta: Record<string, { icon: any, color: string, activeClass: string }> = {
  'writing': { icon: PenTool, color: 'text-rose-500', activeClass: 'bg-rose-500/10 text-rose-400' },
  'image': { icon: Image, color: 'text-emerald-500', activeClass: 'bg-emerald-500/10 text-emerald-400' },
  'document': { icon: FileText, color: 'text-indigo-500', activeClass: 'bg-indigo-500/10 text-indigo-400' },
  'coding': { icon: Code, color: 'text-cyan-500', activeClass: 'bg-cyan-500/10 text-cyan-400' },
  '3d': { icon: Box, color: 'text-amber-500', activeClass: 'bg-amber-500/10 text-amber-400' },
  'default': { icon: Sparkles, color: 'text-violet-500', activeClass: 'bg-violet-500/10 text-violet-400' }
}

function SidebarNavContent() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const categories = useMemo(() => {
    const cats = Array.from(new Set(toolsConfig.map(t => t.category))).sort()
    return cats.map(cat => ({
      name: cat,
      count: toolsConfig.filter(t => t.category === cat).length
    }))
  }, [])

  const totalTools = toolsConfig.length

  return (
    <div className="space-y-6 max-h-[calc(100vh-11rem)] overflow-y-auto custom-scroll pr-1">
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-3 mb-2.5">
          Directory
        </h3>
        <Link 
          href="/dashboard?category=all"
          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all ${
            activeCategory === 'all' 
              ? 'bg-violet-600 text-white shadow-sm' 
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LayoutGrid size={16} />
            <span>All Tools</span>
          </div>
          <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
            activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {totalTools}
          </span>
        </Link>
      </div>

      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-3 mb-2.5">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map(cat => {
            const meta = categoryMeta[cat.name] || categoryMeta.default
            const Icon = meta.icon
            const isActive = activeCategory === cat.name
            
            return (
              <Link
                key={cat.name}
                href={`/dashboard?category=${encodeURIComponent(cat.name)}`}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                  isActive ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon size={15} className={isActive ? 'text-white' : 'text-violet-600'} />
                  <span className="truncate">{cat.name}</span>
                </div>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ml-2 shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {cat.count}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 mt-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-3 mb-2.5">
          Insights
        </h3>
        <div className="space-y-1">
          <Link href="/dashboard/history" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all">
            <History size={15} className="text-slate-500" />
            <span>History</span>
          </Link>
          <Link href="/dashboard/analytics" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all">
            <PieChart size={15} className="text-slate-500" />
            <span>Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SidebarNav() {
  return (
    <Suspense fallback={<div className="p-4 space-y-4"><div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div><div className="space-y-2"><div className="h-8 bg-slate-100 rounded animate-pulse"></div><div className="h-8 bg-slate-100 rounded animate-pulse"></div></div></div>}>
      <SidebarNavContent />
    </Suspense>
  )
}
