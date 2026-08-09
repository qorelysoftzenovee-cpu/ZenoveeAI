import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 pt-16 pb-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_10px_rgba(124,58,237,0.4)] transition-all duration-300">
                <Terminal className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Zenovee<span className="text-violet-400">.</span>
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              The ultimate free tool suite for developers, marketers, and creators. 
              100% client-side. Fast, secure, and always free.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-slate-900 font-extrabold mb-4 text-base tracking-wide uppercase">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">Dashboard</Link></li>
              <li><Link href="/features" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">Features</Link></li>
              <li><Link href="/dashboard?category=Developer+%26+Tech+Utilities" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">Developer Tools</Link></li>
              <li><Link href="/dashboard?category=Growth+Marketing+%26+SEO+Suite" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">SEO Tools</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-slate-900 font-extrabold mb-4 text-base tracking-wide uppercase">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">About Us</Link></li>
              <li><Link href="/features" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">All Features</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-slate-900 font-extrabold mb-4 text-base tracking-wide uppercase">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-800 hover:text-violet-600 font-bold transition-colors text-base">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Zenovee. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Built with</span>
            <span className="text-rose-500 animate-pulse">❤️</span>
            <span>for the web</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
