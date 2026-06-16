import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Zenovee AI.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <p>Last updated: June 2026</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Acceptance of Terms</h2>
          <p>By accessing or using Zenovee AI, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">2. Use of Services</h2>
          <p>You may use our AI tools for lawful business purposes only. You agree not to misuse the platform or attempt to gain unauthorized access.</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">3. Credits and Billing</h2>
          <p>Credits are consumed when you use AI tools. Unused credits do not expire. Refunds are available within 14 days of purchase.</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">4. Limitation of Liability</h2>
          <p>Zenovee AI provides tools on an "as is" basis. We are not liable for any damages arising from your use of our services.</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">5. Contact</h2>
          <p>For questions about these terms, please contact <a href="mailto:support@zenovee.ai" className="text-indigo-600 hover:underline">support@zenovee.ai</a>.</p>
        </div>
      </div>
    </main>
  );
}
