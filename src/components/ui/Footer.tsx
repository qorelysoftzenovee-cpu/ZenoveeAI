import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                Zenovee<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
              The ultimate free tool suite for developers, designers &amp; marketers.
              100% client-side. Fast, private, and always free.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-slate-900 font-black mb-4 text-sm tracking-widest uppercase">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">Dashboard</Link></li>
              <li><Link href="/features" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">All Features</Link></li>
              <li><Link href="/dashboard?category=Developer+%26+Tech+Utilities" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">Developer Tools</Link></li>
              <li><Link href="/dashboard?category=Growth+Marketing+%26+SEO+Suite" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">SEO Tools</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-slate-900 font-black mb-4 text-sm tracking-widest uppercase">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">About Us</Link></li>
              <li><Link href="/features" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">Features</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-slate-900 font-black mb-4 text-sm tracking-widest uppercase">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {currentYear} Zenovee. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>for the open web</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
