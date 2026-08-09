import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { toolsConfig } from '@/utils/toolsConfig';
import { ArrowRight, TerminalSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features | Zenovee',
  description: 'Explore the complete suite of premium client-side developer and marketing tools by Zenovee.',
};

export default function FeaturesPage() {
  const groupedTools = toolsConfig.reduce((acc, tool) => {
    const category = tool.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, typeof toolsConfig>);

  return (
    <main className="min-h-screen flex flex-col overflow-hidden relative">
      <Navbar />
      
      {/* Background */}
      <div className="aurora-mesh absolute inset-0 pointer-events-none opacity-40">
        <div className="aurora-orb aurora-orb-1 opacity-50" />
        <div className="aurora-orb aurora-orb-2 opacity-30" />
        <div className="aurora-orb aurora-orb-3 opacity-40" />
      </div>

      <div className="flex-1 relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-24 anim-fade-up">
          <div className="badge badge-violet mb-6 inline-flex text-sm font-bold">Complete Toolkit</div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Every tool, <span className="gradient-text">one platform.</span>
          </h1>
          <p className="text-xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive suite of client-side utilities designed to supercharge your workflow. From text processing to advanced generators, everything runs locally in your browser.
          </p>
        </div>

        {/* Tools by Category */}
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {Object.entries(groupedTools).map(([category, tools], index) => (
            <section key={category} className={`anim-fade-up delay-${(index % 3 + 1) * 100}`}>
              <div className="flex items-center gap-4 mb-10 border-b border-slate-200 pb-4">
                <TerminalSquare className="w-8 h-8 text-violet-600" />
                <h2 className="text-3xl font-black text-slate-900">{category}</h2>
                <div className="badge badge-cyan ml-2 text-xs font-bold px-3 py-1">{tools.length} Tools</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {tools.map((tool) => (
                  <Link href={`/dashboard/tools/${tool.id}`} key={tool.id} className="block group h-full">
                    <div className="tool-card h-full flex flex-col p-5 bg-white border border-slate-200 shadow-sm rounded-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-1">{tool.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 font-semibold flex-1 mb-4 leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="text-sm font-extrabold text-violet-600 flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                        Launch Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-6 mt-32 anim-fade-up delay-300">
          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 p-12 text-center text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10 tracking-tight">Ready to boost your productivity?</h2>
            <p className="text-violet-200 mb-10 max-w-xl mx-auto relative z-10 text-lg">
              Join thousands of professionals using Zenovee to work smarter and faster.
            </p>
            <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-violet-900 font-bold hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 relative z-10">
              Go to Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
