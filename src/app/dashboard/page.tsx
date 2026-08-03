"use client"
import { toolsConfig } from '@/utils/toolsConfig'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, ChevronRight, Sparkles, X } from 'lucide-react'

function DashboardContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const initialSearch = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  
  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    setSelectedCategory(cat)
  }, [searchParams])

  const categories = useMemo(() => {
    const cats = new Set(toolsConfig.map(t => t.category))
    return Array.from(cats).sort()
  }, [])

  const filteredTools = useMemo(() => {
    return toolsConfig.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="anim-fade-up">
      <div className="glass-card-dark rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search across all tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-xl px-3.5 py-2 text-xs font-medium cursor-pointer transition-all border ${
                selectedCategory === 'all' 
                  ? 'bg-violet-500/20 text-violet-300 border-violet-500/30 ring-1 ring-violet-500/20' 
                  : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-2 text-xs font-medium cursor-pointer transition-all border capitalize ${
                  selectedCategory === cat
                    ? 'bg-violet-500/20 text-violet-300 border-violet-500/30 ring-1 ring-violet-500/20' 
                    : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 hover:border-white/20'
                }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl text-white">Available Tools</h2>
        <span className="badge badge-violet">{filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}</span>
      </div>

      {filteredTools.length === 0 ? (
        <div className="glass-card-dark rounded-2xl p-12 text-center anim-fade-scale border border-white/5">
          <div className="mx-auto w-12 h-12 bg-violet-500/10 text-violet-400 rounded-full flex items-center justify-center mb-4 ring-1 ring-violet-500/20">
            <Sparkles size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No tools found</h3>
          <p className="text-sm text-zinc-400 mb-6">We couldn't find any tools matching your criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger">
          {filteredTools.map((tool, i) => (
            <Link href={`/dashboard/tools/${tool.id}`} key={tool.id} className={`tool-card group delay-${(i % 5 + 1) * 100}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="badge badge-violet text-[10px] uppercase tracking-wider font-bold capitalize">{tool.category.replace('-', ' ')}</span>
              </div>
              <h3 className="text-sm font-semibold text-white mt-2 line-clamp-1 group-hover:text-violet-300 transition-colors">{tool.title}</h3>
              <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2">{tool.description}</p>
              
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center group-hover:border-violet-500/30 transition-colors">
                <span className="text-xs font-medium text-violet-400">Launch Tool</span>
                <ChevronRight size={14} className="text-violet-400 opacity-60 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <DashboardContent />
    </Suspense>
  )
}
