import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Target, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Zenovee AI, our mission to consolidate fragmented software, and our high-performance AI operating system.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">About Zenovee AI</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We are building the ultimate AI operating system for professionals. Our mission is to end subscription fatigue by offering a comprehensive suite of enterprise-grade tools in one secure workspace.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl w-fit mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To democratize access to advanced AI tools by collapsing fragmented, costly software stacks into a single, affordable platform.
            </p>
          </div>
          
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl w-fit mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Quality</h3>
            <p className="text-slate-600 leading-relaxed">
              We leverage top-tier models like Llama 3 70B via the Groq engine, ensuring outputs are professional, accurate, and ready for production.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl w-fit mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Unmatched Speed</h3>
            <p className="text-slate-600 leading-relaxed">
              Our architecture is designed for instantaneous execution. Spend less time waiting for generation and more time taking action.
            </p>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-slate-900 px-8 py-16 sm:p-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.2),transparent_70%)]" />
          <h2 className="text-3xl font-bold tracking-tight text-white relative z-10">Join the Zenovee AI Network</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto relative z-10">
            Experience the platform that is changing how modern businesses operate.
          </p>
          <div className="mt-8 flex justify-center relative z-10">
            <Link href="/signup" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors">
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
