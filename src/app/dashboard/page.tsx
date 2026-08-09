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
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-sm border border-slate-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search across all tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-lg placeholder-slate-400 focus:border-violet-600 focus:bg-white focus:ring-2 focus:ring-violet-500/20 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-all border ${
                selectedCategory === 'all' 
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm ring-2 ring-violet-500/30' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300'
              }`}
            >
              All Tools
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-all border capitalize ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white border-violet-600 shadow-sm ring-2 ring-violet-500/30' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="font-black text-3xl text-slate-900 tracking-tight">Available Tools</h2>
        <span className="badge badge-violet text-sm font-bold px-3.5 py-1.5">{filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}</span>
      </div>

      {filteredTools.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center anim-fade-scale border border-slate-200 shadow-sm">
          <div className="mx-auto w-14 h-14 bg-violet-500/10 text-violet-600 rounded-full flex items-center justify-center mb-4 ring-1 ring-violet-500/20">
            <Sparkles size={28} />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">No tools found</h3>
          <p className="text-base text-slate-600 mb-6 font-semibold">We couldn't find any tools matching your criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}
            className="btn-primary text-base py-3.5 px-6"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger">
          {filteredTools.map((tool, i) => (
            <Link href={`/dashboard/tools/${tool.id}`} key={tool.id} className={`tool-card group delay-${(i % 5 + 1) * 100}`}>
              <div className="flex items-start justify-between mb-2">
                <span className="badge badge-violet text-xs uppercase tracking-wider font-bold capitalize px-2.5 py-1">{tool.category}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-2.5 line-clamp-1 group-hover:text-violet-600 transition-colors">{tool.title}</h3>
              <p className="text-sm text-slate-600 font-semibold mt-2 line-clamp-2 leading-relaxed">{tool.description}</p>
              
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-between items-center group-hover:border-violet-200 transition-colors">
                <span className="text-sm font-extrabold text-violet-600">Launch Tool</span>
                <ChevronRight size={16} className="text-violet-600 opacity-80 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all" />
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
