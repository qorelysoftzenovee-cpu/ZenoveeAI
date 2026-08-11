import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: "Privacy Policy — Your Data Stays in Your Browser | Zenovee",
  description:
    "Zenovee's privacy policy. All tools run 100% client-side in your browser. No data is ever sent to our servers. Zero tracking, zero data collection.",
  keywords: ["privacy policy", "zenovee privacy", "no data collection", "browser privacy", "client-side tools"],
  alternates: { canonical: "https://zenovee.in/privacy" },
  openGraph: {
    title: "Privacy Policy | Zenovee",
    description: "All Zenovee tools run in your browser. Your data is never sent to any server.",
    url: "https://zenovee.in/privacy",
    type: "website",
    siteName: "Zenovee",
  },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Navbar />
      
      {/* Background */}
      <div className="aurora-mesh absolute inset-0 pointer-events-none opacity-20">
        <div className="aurora-orb aurora-orb-1 opacity-20" />
      </div>

      <div className="flex-1 pt-32 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Privacy Policy
          </h1>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 mt-8 border border-slate-200 shadow-sm">
            <div className="prose-output text-slate-700 font-medium text-base leading-relaxed">
              <p className="text-slate-500 font-semibold leading-relaxed mb-6">
                Last updated: August 2026
              </p>
              
              <p>
                At Zenovee, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our application.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, when you participate in activities on the application, or otherwise when you contact us. This may include your name, email address, and usage data.
              </p>

              <h2>How We Use It</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to create and manage your account, deliver targeted advertising, email you regarding your account or order, fulfill and manage purchases, orders, payments, and other transactions related to the application.
              </p>

              <h2>Data Security</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Because many of our tools process data locally on your device, a significant portion of your sensitive data never reaches our servers.
              </p>

              <h2>Contact</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@zenovee.ai">privacy@zenovee.ai</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
