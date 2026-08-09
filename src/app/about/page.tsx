import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { Target, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Zenovee',
  description: 'Learn about Zenovee, our mission, and how we build tools for the modern web.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col overflow-hidden relative">
      <Navbar />
      
      {/* Background */}
      <div className="aurora-mesh absolute inset-0 pointer-events-none opacity-40">
        <div className="aurora-orb aurora-orb-1 opacity-40" />
        <div className="aurora-orb aurora-orb-2 opacity-30" />
      </div>

      <div className="flex-1 relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-24 anim-fade-up">
          <div className="badge badge-violet mb-6 inline-flex text-sm font-bold">Our Story</div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Built for the <span className="gradient-text">modern web.</span>
          </h1>
          <p className="text-xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Zenovee is on a mission to democratize powerful AI and productivity tools, bringing them directly to your browser with unparalleled speed, privacy, and user experience.
          </p>
        </div>

        {/* Values Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-start anim-fade-up delay-100">
              <div className="bg-violet-500/10 text-violet-600 rounded-xl p-3 mb-6 ring-1 ring-violet-500/20">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 font-medium text-base leading-relaxed">
                To build beautifully designed, highly functional tools that respect your time and boost your daily productivity without unnecessary friction.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-start anim-fade-up delay-200">
              <div className="bg-cyan-500/10 text-cyan-600 rounded-xl p-3 mb-6 ring-1 ring-cyan-500/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Privacy-First</h3>
              <p className="text-slate-600 font-medium text-base leading-relaxed">
                We believe your data is yours. Our tools are built to run locally in your browser whenever possible, keeping your sensitive information safe.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-start anim-fade-up delay-300">
              <div className="bg-emerald-500/10 text-emerald-600 rounded-xl p-3 mb-6 ring-1 ring-emerald-500/20">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Instant Speed</h3>
              <p className="text-slate-600 font-medium text-base leading-relaxed">
                No waiting, no loading screens. By leveraging modern client-side technologies, our tools operate with zero latency for a seamless experience.
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Section */}
        <div className="max-w-5xl mx-auto px-6 mb-32 anim-fade-up delay-400">
          <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl font-black text-slate-900 mb-6">How Zenovee works</h2>
              <div className="space-y-6 text-slate-700 font-medium text-lg leading-relaxed">
                <p>
                  Unlike traditional web applications that send your data back and forth to a server, Zenovee is built on a client-side architecture powered by modern web technologies.
                </p>
                <p>
                  This means that for the vast majority of our tools, the heavy lifting happens directly on your device. This approach fundamentally shifts how we handle performance and privacy. Your data never leaves your browser unless absolutely necessary.
                </p>
                <p>
                  The result? An instantly responsive toolkit that feels like a native desktop application, wrapped in a premium, beautifully crafted user interface.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-6 anim-fade-up delay-500">
          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 p-12 text-center text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 relative z-10 tracking-tight">Experience the difference</h2>
            <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-violet-900 font-bold hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 relative z-10">
              Explore Our Tools <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
