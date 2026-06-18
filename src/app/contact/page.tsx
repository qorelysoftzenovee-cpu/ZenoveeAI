import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Zenovee AI team for support, enterprise inquiries, or partnership opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFE] pb-24 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Contact Us</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether you need technical support, want to inquire about an enterprise deployment, or just want to say hello, our team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Email Support</h3>
                  <p className="mt-2 text-slate-600">For general inquiries and technical assistance.</p>
                  <a href="mailto:support@zenovee.ai" className="mt-2 block font-medium text-teal-600 hover:text-teal-500">
                    support@zenovee.ai
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Headquarters</h3>
                  <p className="mt-2 text-slate-600">
                    Zenovee AI Inc.<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm outline-none transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm outline-none transition-colors"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-900">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="button"
                className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 transition-colors"
              >
                Send Message
              </button>
              <p className="text-xs text-slate-500 text-center mt-4">
                This form is for demonstration purposes. Please use the email address provided above for actual support.
              </p>
            </form>
          </div>
        </div>

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zenovee AI",
              url: "https://zenovee.ai",
              logo: "https://zenovee.ai/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "support@zenovee.ai",
                contactType: "customer service"
              }
            })
          }}
        />
      </div>
    </main>
  );
}
