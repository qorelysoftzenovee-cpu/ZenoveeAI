import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Target, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Zenovee Free Suite",
  description: "Learn about Zenovee Free Suite, our mission to consolidate fragmented tools, and our local client-side architecture.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">About Zenovee Free Suite</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We are building a comprehensive, 100% free hub of client-side developer, marketing, and productivity tools. Our mission is to end subscription fatigue by offering a comprehensive suite of utilities that run entirely in your browser with zero data storage or registration requirements.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To democratize access to advanced utilities by collapsing fragmented, costly software stacks into a single, completely free platform.
            </p>
          </div>
          
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">100% Browser Local</h3>
            <p className="text-slate-600 leading-relaxed">
              We leverage modern client-side APIs, ensuring your inputs never leave your computer. Pure privacy, zero server storage, and zero tracking.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Execution</h3>
            <p className="text-slate-600 leading-relaxed">
              No API calls, no token limitations, and zero network latency. Run file converters, slug creators, and dynamic calculators in microseconds.
            </p>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-slate-900 px-8 py-16 sm:p-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2),transparent_70%)]" />
          <h2 className="text-3xl font-bold tracking-tight text-white relative z-10">Access All 50+ Utilities Instantly</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto relative z-10">
            No signup, no authentication, and no limits. Experience the suite that puts your data privacy first.
          </p>
          <div className="mt-8 flex justify-center relative z-10">
            <Link href="/dashboard" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors">
              Browse All Free Tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
