import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description: "Transparent pricing for the Zenovee AI suite. Stop paying for fragmented tools and consolidate your stack.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Transparent Pricing</h1>
          <p className="mt-4 text-lg text-slate-600">
            Stop paying for fragmented subscriptions. Get access to 50 professional tools under one unified billing system.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Launch Trial Pass</h2>
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600 ring-1 ring-inset ring-teal-500/20">
                Most Popular
              </span>
            </div>
            
            <div className="mb-6 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-slate-900">$8</span>
              <span className="text-sm font-semibold leading-6 text-slate-500">one-time</span>
            </div>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Test all 50 professional AI tools with 1 full execution run per tool to experience the platform.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Access to all 50 AI tools",
                "Marketing, Dev, Data, & Media categories",
                "Secure, private workspace",
                "Advanced AI models (Llama 3 70B)",
                "No recurring subscription lock-in",
                "Generate up to 50 full productions"
              ].map((feature, idx) => (
                <li key={idx} className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-teal-600" aria-hidden="true" />
                  <span className="text-sm leading-6 text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link
              href="/signup"
              className="block w-full rounded-xl bg-teal-600 px-3 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Get Instant Access
            </Link>
            <p className="text-center mt-4 text-xs text-slate-500">14-day money-back guarantee. No hidden fees.</p>
          </div>
        </div>
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is there a recurring fee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, the Launch Trial Pass is a one-time payment of $8. You are not locked into any recurring subscription."
                  }
                },
                {
                  "@type": "Question",
                  name: "Which AI models do you use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We utilize advanced enterprise-grade models via Groq, including Llama-3-70B-Versatile for maximum speed and intelligence."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </main>
  );
}
