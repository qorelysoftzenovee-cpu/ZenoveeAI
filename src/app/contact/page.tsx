import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Mail, MapPin } from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Contact | Zenovee',
  description: 'Get in touch with the Zenovee team for support, feedback, or inquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col overflow-hidden relative">
      <Navbar />
      
      {/* Background */}
      <div className="aurora-mesh absolute inset-0 pointer-events-none opacity-40">
        <div className="aurora-orb aurora-orb-3 opacity-40" />
        <div className="aurora-orb aurora-orb-4 opacity-30" />
      </div>

      <div className="flex-1 relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 anim-fade-up">
          <div className="badge badge-cyan mb-6 inline-flex">Get in Touch</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            We'd love to <span className="gradient-text">hear from you.</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about features, pricing, or need technical support, our team is ready to answer all your questions.
          </p>
        </div>

        {/* Contact Content */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left: Info */}
            <div className="space-y-8 anim-fade-up delay-100">
              <div className="glass-card-dark rounded-2xl p-8 flex items-start gap-6">
                <div className="bg-violet-500/10 text-violet-400 rounded-xl p-3 shrink-0 ring-1 ring-violet-500/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                  <p className="text-zinc-400 mb-4">Our friendly team is here to help.</p>
                  <a href="mailto:support@zenovee.ai" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">
                    support@zenovee.ai
                  </a>
                </div>
              </div>

              <div className="glass-card-dark rounded-2xl p-8 flex items-start gap-6">
                <div className="bg-cyan-500/10 text-cyan-400 rounded-xl p-3 shrink-0 ring-1 ring-cyan-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Office</h3>
                  <p className="text-zinc-400 mb-4">Come say hello at our headquarters.</p>
                  <address className="text-zinc-300 not-italic leading-relaxed">
                    Zenovee HQ<br />
                    100 Innovation Drive<br />
                    San Francisco, CA 94105
                  </address>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="anim-fade-up delay-200">
              <div className="glass-card-dark rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <form className="space-y-6 relative z-10">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="jane@example.com"
                      className="w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                    <textarea 
                      id="message"
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-y custom-scroll"
                    ></textarea>
                  </div>

                  <button type="button" className="btn-primary w-full py-3.5 justify-center text-base rounded-xl font-medium shadow-md">
                    Send Message
                  </button>

                  <p className="text-sm text-zinc-500 text-center mt-6">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Schema */}
      <Script id="contact-schema" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Zenovee",
          "description": "Contact page for Zenovee AI tools.",
          "url": "https://zenovee.ai/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Zenovee",
            "email": "support@zenovee.ai",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "100 Innovation Drive",
              "addressLocality": "San Francisco",
              "addressRegion": "CA",
              "postalCode": "94105",
              "addressCountry": "US"
            }
          }
        })
      }} />
    </main>
  );
}
