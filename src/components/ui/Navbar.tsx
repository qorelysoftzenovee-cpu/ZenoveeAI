"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3.5" : "bg-white/80 backdrop-blur-sm py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md group-hover:shadow-blue-500/30 transition-all duration-300">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              Zenovee<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="btn-primary py-2.5 px-5 text-sm"
            >
              Launch Suite <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 py-4 px-4 flex flex-col gap-2 shadow-xl anim-fade-down">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold p-3 rounded-xl transition-colors ${
                isActive(link.href)
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="btn-primary w-full justify-center mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Launch Suite <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
