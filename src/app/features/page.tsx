import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LayoutGrid, Layers, LineChart, Sparkles } from "lucide-react";
import { toolsConfig } from "@/utils/toolsConfig";

export const metadata: Metadata = {
  title: "50+ Client-Side Free Tools | Zenovee Free Suite",
  description: "Explore our comprehensive suite of 50+ client-side utility tools for marketing, development, data analysis, and media conversion.",
  openGraph: {
    title: "50+ Client-Side Free Tools | Zenovee Free Suite",
    description: "Explore our comprehensive suite of 50+ client-side utility tools.",
  }
};

export default function FeaturesPage() {
  const categories = [
    { name: "Content & Marketing Engines", icon: <Sparkles className="w-5 h-5" />, tools: toolsConfig.slice(0, 15) },
    { name: "Developer & Technical Utilities", icon: <LayoutGrid className="w-5 h-5" />, tools: toolsConfig.slice(15, 30) },
    { name: "Data & SEO Solvers", icon: <LineChart className="w-5 h-5" />, tools: toolsConfig.slice(30, 40) },
    { name: "Financial & Media Operations", icon: <Layers className="w-5 h-5" />, tools: toolsConfig.slice(40, 50) },
  ];

  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">All 50+ Browser-Native Utilities</h1>
          <p className="mt-4 text-lg text-slate-600">
            A comprehensive overview of every tool included in the Zenovee Free Suite. Secure, fast, and private utilities running entirely on your machine.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((cat, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  {cat.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{cat.name}</h2>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map(tool => (
                  <div key={tool.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-slate-900">{tool.title || tool.name}</h3>
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 border border-emerald-100">
                        100% Free
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.description}</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready to use
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        
        <div className="mt-24 rounded-3xl bg-indigo-600 px-6 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready to access all 50+ tools?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">Browse and launch any developer, marketing, data, or media utility instantly.</p>
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors">
              Launch Tools Workspace
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
