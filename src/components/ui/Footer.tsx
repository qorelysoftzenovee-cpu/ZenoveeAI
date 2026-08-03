import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_10px_rgba(124,58,237,0.4)] transition-all duration-300">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Zenovee<span className="text-violet-400">.</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              The ultimate free tool suite for developers, marketers, and creators. 
              100% client-side. Fast, secure, and always free.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Dashboard</Link></li>
              <li><Link href="/features" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Features</Link></li>
              <li><Link href="/dashboard?category=Developer+Tools" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Developer Tools</Link></li>
              <li><Link href="/dashboard?category=Growth+Marketing" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Marketing Tools</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Contact</Link></li>
              <li><a href="#" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {currentYear} Zenovee. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>Built with</span>
            <span className="text-rose-500 animate-pulse">❤️</span>
            <span>for the web</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
