import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Zenovee',
  description: 'Terms of Service for Zenovee AI.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Navbar />
      
      {/* Background */}
      <div className="aurora-mesh absolute inset-0 pointer-events-none opacity-20">
        <div className="aurora-orb aurora-orb-2 opacity-20" />
      </div>

      <div className="flex-1 pt-32 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            Terms of Service
          </h1>
          
          <div className="glass-card-dark rounded-3xl p-8 md:p-12 mt-8 border border-white/10 shadow-xl">
            <div className="prose-output">
              <p className="text-zinc-400 leading-relaxed mb-6">
                Last updated: August 2026
              </p>
              
              <p>
                Please read these terms of service carefully before using the Zenovee website and application operated by us.
              </p>

              <h2>Acceptance</h2>
              <p>
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>

              <h2>Use of Services</h2>
              <p>
                You are permitted to use our tools and services for personal or commercial purposes, subject to the limitations set forth in these terms. You may not use the services for any illegal or unauthorized purpose, nor may you, in the use of the service, violate any laws in your jurisdiction.
              </p>

              <h2>Pricing & Limits</h2>
              <p>
                Zenovee provides free client-side tools. Certain premium features, server-side processing (if applicable in the future), or API usage may require an account or subscription. We reserve the right to modify pricing with reasonable notice, and we may impose usage limits to prevent abuse.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                In no event shall Zenovee, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>

              <h2>Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us at: <a href="mailto:legal@zenovee.ai">legal@zenovee.ai</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
