"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  PenTool,
  TrendingUp,
  CheckSquare,
  Calculator,
  Cpu,
  LayoutGrid,
  Clock,
  BarChart3,
  Globe,
  RefreshCw,
  Code,
  ShieldCheck,
  Palette,
  FileText,
  Bookmark,
  HeartPulse,
  Video,
  ShoppingBag,
  Briefcase,
  Search,
  Lock,
  GraduationCap,
  Home,
  Plane,
  Gamepad2,
  FolderKanban
} from "lucide-react";
import { toolsConfig } from "@/utils/toolsConfig";

// Map category names to icons and colors
const categoryMeta: Record<string, { icon: any; colorClass: string; activeClass: string }> = {
  "Content Creation": { icon: PenTool, colorClass: "text-rose-500", activeClass: "bg-rose-50/80 text-rose-600 border-rose-200/50 shadow-sm" },
  "Growth Marketing": { icon: TrendingUp, colorClass: "text-amber-500", activeClass: "bg-amber-50/80 text-amber-600 border-amber-200/50 shadow-sm" },
  "Productivity Solvers": { icon: CheckSquare, colorClass: "text-emerald-500", activeClass: "bg-emerald-50/80 text-emerald-600 border-emerald-200/50 shadow-sm" },
  "Financial Calculators": { icon: Calculator, colorClass: "text-purple-500", activeClass: "bg-purple-50/80 text-purple-600 border-purple-200/50 shadow-sm" },
  "Data & Tech Utilities": { icon: Cpu, colorClass: "text-indigo-500", activeClass: "bg-indigo-50/80 text-indigo-600 border-indigo-200/50 shadow-sm" },
  "Network & IP Utilities": { icon: Globe, colorClass: "text-blue-500", activeClass: "bg-blue-50/80 text-blue-600 border-blue-200/50 shadow-sm" },
  "Converters & Encoders": { icon: RefreshCw, colorClass: "text-teal-500", activeClass: "bg-teal-50/80 text-teal-600 border-teal-200/50 shadow-sm" },
  "Text & Code Formatters": { icon: Code, colorClass: "text-cyan-500", activeClass: "bg-cyan-50/80 text-cyan-600 border-cyan-200/50 shadow-sm" },
  "Calculators & Mathematics": { icon: Bookmark, colorClass: "text-violet-500", activeClass: "bg-violet-50/80 text-violet-600 border-violet-200/50 shadow-sm" },
  "Security & Generators": { icon: ShieldCheck, colorClass: "text-red-500", activeClass: "bg-red-50/80 text-red-600 border-red-200/50 shadow-sm" },
  "Developer & Web Tools": { icon: Code, colorClass: "text-sky-500", activeClass: "bg-sky-50/80 text-sky-600 border-sky-200/50 shadow-sm" },
  "Design, Image & Color Utilities": { icon: Palette, colorClass: "text-pink-500", activeClass: "bg-pink-50/80 text-pink-600 border-pink-200/50 shadow-sm" },
  "Text Processing & Writing Utilities": { icon: FileText, colorClass: "text-lime-500", activeClass: "bg-lime-50/80 text-lime-600 border-lime-200/50 shadow-sm" },
  "Daily Math & Student Tools": { icon: GraduationCap, colorClass: "text-yellow-500", activeClass: "bg-yellow-50/80 text-yellow-600 border-yellow-200/50 shadow-sm" },
  "Health, Fitness & Everyday Life": { icon: HeartPulse, colorClass: "text-rose-600", activeClass: "bg-rose-50/80 text-rose-700 border-rose-200/50 shadow-sm" },
  "Social Media & Video Creator Tools": { icon: Video, colorClass: "text-fuchsia-500", activeClass: "bg-fuchsia-50/80 text-fuchsia-600 border-fuchsia-200/50 shadow-sm" },
  "E-Commerce & Amazon Seller Tools": { icon: ShoppingBag, colorClass: "text-orange-500", activeClass: "bg-orange-50/80 text-orange-600 border-orange-200/50 shadow-sm" },
  "Business, HR & Freelance Tools": { icon: Briefcase, colorClass: "text-slate-600", activeClass: "bg-slate-100 text-slate-800 border-slate-300 shadow-sm" },
  "SEO & Webmaster Suite": { icon: Search, colorClass: "text-emerald-600", activeClass: "bg-emerald-50/80 text-emerald-700 border-emerald-200/50 shadow-sm" },
  "Cryptography, Hashing & Cyber Tools": { icon: Lock, colorClass: "text-purple-600", activeClass: "bg-purple-50/80 text-purple-700 border-purple-200/50 shadow-sm" },
  "Education, Science & Engineering": { icon: GraduationCap, colorClass: "text-blue-600", activeClass: "bg-blue-50/80 text-blue-700 border-blue-200/50 shadow-sm" },
  "Home, Real Estate & Auto Tools": { icon: Home, colorClass: "text-amber-600", activeClass: "bg-amber-50/80 text-amber-700 border-amber-200/50 shadow-sm" },
  "Travel, Time & World Utilities": { icon: Plane, colorClass: "text-cyan-600", activeClass: "bg-cyan-50/80 text-cyan-700 border-cyan-200/50 shadow-sm" },
  "Gaming, Streaming & Content Fun": { icon: Gamepad2, colorClass: "text-indigo-600", activeClass: "bg-indigo-50/80 text-indigo-700 border-indigo-200/50 shadow-sm" },
  "Personal Utility & Productivity Tools": { icon: FolderKanban, colorClass: "text-teal-600", activeClass: "bg-teal-50/80 text-teal-700 border-teal-200/50 shadow-sm" },
};

function SidebarNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  // Get unique categories and count of tools per category
  const categoriesWithCounts = Array.from(
    new Set(toolsConfig.map((t) => t.category))
  ).map((catName) => {
    const count = toolsConfig.filter((t) => t.category === catName).length;
    const meta = categoryMeta[catName] || {
      icon: LayoutGrid,
      colorClass: "text-indigo-500",
      activeClass: "bg-indigo-50/80 text-indigo-600 border-indigo-200/50 shadow-sm",
    };
    return {
      name: catName,
      count,
      href: `/dashboard?category=${encodeURIComponent(catName)}`,
      active: selectedCategory === catName,
      ...meta,
    };
  });

  const insightLinks = [
    {
      href: "/dashboard/history",
      label: "Recent History",
      icon: Clock,
      active: pathname === "/dashboard/history",
      colorClass: "text-teal-500",
      activeClass: "bg-teal-50/80 text-teal-600 border-teal-200/50 shadow-sm",
    },
    {
      href: "/dashboard/analytics",
      label: "Local Analytics",
      icon: BarChart3,
      active: pathname === "/dashboard/analytics",
      colorClass: "text-violet-500",
      activeClass: "bg-violet-50/80 text-violet-600 border-violet-200/50 shadow-sm",
    },
  ];

  return (
    <div className="space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto pr-1">
      {/* Primary Directory Link */}
      <div className="space-y-1">
        <p className="px-3.5 text-[11px] font-extrabold text-slate-450 uppercase tracking-widest">
          Suite Directory ({toolsConfig.length} Tools)
        </p>
        <Link
          href="/dashboard"
          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all border ${
            pathname === "/dashboard" && !selectedCategory
              ? "bg-indigo-50/80 text-indigo-605 border-indigo-200/50 shadow-sm animate-pulse-slow"
              : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <LayoutGrid className="h-4 w-4 text-indigo-500" />
            <span>All Free Utilities</span>
          </div>
          <span className="text-[10px] font-extrabold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            {toolsConfig.length}
          </span>
        </Link>
      </div>

      {/* All Categories */}
      <div className="space-y-1">
        <p className="px-3.5 text-[11px] font-extrabold text-slate-450 uppercase tracking-widest">
          Tool Categories ({categoriesWithCounts.length})
        </p>
        <div className="space-y-1">
          {categoriesWithCounts.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all border group ${
                  cat.active
                    ? cat.activeClass
                    : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${cat.colorClass}`} />
                  <span className="truncate">{cat.name}</span>
                </div>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded group-hover:bg-white transition-colors shrink-0">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Local Insights */}
      <div className="space-y-1 pt-2 border-t border-slate-100">
        <p className="px-3.5 text-[11px] font-extrabold text-slate-450 uppercase tracking-widest">
          Local Insights
        </p>
        <div className="space-y-1">
          {insightLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all border ${
                  link.active
                    ? link.activeClass
                    : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${link.colorClass}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SidebarNav() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-slate-400">Loading sidebar...</div>}>
      <SidebarNavContent />
    </Suspense>
  );
}
