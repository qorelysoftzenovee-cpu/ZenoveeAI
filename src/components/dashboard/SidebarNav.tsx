"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PenTool,
  TrendingUp,
  CheckSquare,
  Calculator,
  Cpu,
  LayoutGrid,
  Clock,
  BarChart3,
} from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  const domainLinks = [
    {
      href: "/dashboard?category=content",
      label: "Content Creation",
      icon: PenTool,
      active: pathname === "/dashboard" && pathname.includes("category=content"),
      badge: "Free",
      colorClass: "text-rose-500",
      activeClass: "bg-rose-50/80 text-rose-600 border-rose-200/50 shadow-sm",
    },
    {
      href: "/dashboard?category=marketing",
      label: "Growth Marketing",
      icon: TrendingUp,
      active: pathname.includes("category=marketing"),
      badge: "Free",
      colorClass: "text-amber-500",
      activeClass: "bg-amber-50/80 text-amber-600 border-amber-200/50 shadow-sm",
    },
    {
      href: "/dashboard?category=productivity",
      label: "Productivity Solvers",
      icon: CheckSquare,
      active: pathname.includes("category=productivity"),
      badge: "Free",
      colorClass: "text-emerald-500",
      activeClass: "bg-emerald-50/80 text-emerald-600 border-emerald-200/50 shadow-sm",
    },
    {
      href: "/dashboard?category=financial",
      label: "Financial Calculators",
      icon: Calculator,
      active: pathname.includes("category=financial"),
      badge: "Free",
      colorClass: "text-purple-500",
      activeClass: "bg-purple-50/80 text-purple-600 border-purple-200/50 shadow-sm",
    },
    {
      href: "/dashboard?category=tech",
      label: "Data/Tech Utilities",
      icon: Cpu,
      active: pathname.includes("category=tech"),
      badge: "Free",
      colorClass: "text-indigo-500",
      activeClass: "bg-indigo-50/80 text-indigo-600 border-indigo-200/50 shadow-sm",
    },
  ];

  const insightLinks = [
    {
      href: "/template",
      label: "Standalone SPA",
      icon: BarChart3,
      active: pathname === "/template",
      colorClass: "text-amber-500",
      activeClass: "bg-amber-50/80 text-amber-600 border-amber-200/50 shadow-sm",
    },
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
    <div className="space-y-6">
      {/* Primary Directory Link */}
      <div className="space-y-1">
        <p className="px-3.5 text-[11px] font-extrabold text-slate-450 uppercase tracking-widest">
          Suite Directory
        </p>
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all border ${
            pathname === "/dashboard" && !pathname.includes("category=")
              ? "bg-indigo-50/80 text-indigo-605 border-indigo-200/50 shadow-sm animate-pulse-slow"
              : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <LayoutGrid className="h-4 w-4 text-indigo-500" />
          <span>All Free Utilities</span>
        </Link>
      </div>

      {/* 5 Core Domains */}
      <div className="space-y-1">
        <p className="px-3.5 text-[11px] font-extrabold text-slate-450 uppercase tracking-widest">
          Core Domains
        </p>
        <div className="space-y-1">
          {domainLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all border group ${
                  link.active
                    ? link.activeClass
                    : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${link.colorClass}`} />
                  <span>{link.label}</span>
                </div>
                <span className="text-[9px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded group-hover:bg-white transition-colors">
                  {link.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Local Insights */}
      <div className="space-y-1">
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
