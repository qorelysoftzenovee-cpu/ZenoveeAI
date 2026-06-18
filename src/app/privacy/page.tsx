import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Zenovee AI.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <p>Last updated: June 2026</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Information We Collect</h2>
          <p>Zenovee AI collects your email address and account credentials when you register. We also collect usage data to improve our platform and services.</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">2. How We Use Your Information</h2>
          <p>Your information is used to provide, maintain, and improve our AI tools platform. We do not sell your personal data to third parties.</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest via Supabase infrastructure.</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8">4. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@zenovee.ai" className="text-teal-600 hover:underline">support@zenovee.ai</a>.</p>
        </div>
      </div>
    </main>
  );
}
