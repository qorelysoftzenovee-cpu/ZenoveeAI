import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LayoutGrid, Layers, LineChart, Sparkles } from "lucide-react";
import { toolsConfig } from "@/utils/toolsConfig";

export const metadata: Metadata = {
  title: "50 AI Tools Features",
  description: "Explore our comprehensive suite of 50 AI-powered tools for marketing, development, data analysis, and media conversion.",
  openGraph: {
    title: "50 AI Tools Features | Zenovee AI",
    description: "Explore our comprehensive suite of 50 AI-powered tools.",
  }
};

export default function FeaturesPage() {
  const categories = [
    { name: "Content & Marketing", icon: <Sparkles className="w-5 h-5" />, tools: toolsConfig.slice(0, 15) },
    { name: "Developer & Tech", icon: <LayoutGrid className="w-5 h-5" />, tools: toolsConfig.slice(15, 30) },
    { name: "Data & SEO Analytics", icon: <LineChart className="w-5 h-5" />, tools: toolsConfig.slice(30, 40) },
    { name: "File Conversion & Media", icon: <Layers className="w-5 h-5" />, tools: toolsConfig.slice(40, 50) },
  ];

  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">All 50 AI Tools</h1>
          <p className="mt-4 text-lg text-slate-600">
            A comprehensive overview of every tool included in the Zenovee AI suite. Automate everything from content creation to code refactoring.
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
                      <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                      <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500 border border-slate-100">
                        {tool.cost} credits
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
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready to access all 50 tools?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">Join professionals using Zenovee AI to automate their workflows.</p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors">
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
