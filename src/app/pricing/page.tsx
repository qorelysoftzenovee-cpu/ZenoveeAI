import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Plans | Zenovee Free Suite",
  description: "Zenovee Free Suite is 100% free forever. No registration, no credit cards, and no usage limitations.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">100% Free Forever</h1>
          <p className="mt-4 text-lg text-slate-600">
            No signup. No credits. No subscriptions. Run all 50+ professional utilities in one unified client-side dashboard, immediately.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Free Tools Suite</h2>
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
                Instant Access
              </span>
            </div>
            
            <div className="mb-6 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-slate-900">$0</span>
              <span className="text-sm font-semibold leading-6 text-slate-500">free forever</span>
            </div>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Run image compressors, JWT decoders, formatters, and UTM calculators locally. Zero backend APIs, absolute privacy.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Unrestricted access to 50+ tools",
                "100% client-side execution in browser",
                "Complete data privacy (no server logging)",
                "No registration or signups required",
                "Export results in Markdown or CSV formats",
                "Zero credit card or payment setups needed"
              ].map((feature, idx) => (
                <li key={idx} className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span className="text-sm leading-6 text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link
              href="/dashboard"
              className="block w-full rounded-xl bg-indigo-600 px-3 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Using Free Tools
            </Link>
            <p className="text-center mt-4 text-xs text-slate-500">Instant launch. No credit card required.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
