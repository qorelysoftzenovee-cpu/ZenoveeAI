"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, LayoutGrid, Shield } from "lucide-react";

interface SidebarNavProps {
  isAdmin: boolean;
}

export function SidebarNav({ isAdmin }: SidebarNavProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "All Tools",
      icon: LayoutGrid,
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/tools"),
      activeClass: "bg-indigo-50/70 text-indigo-600 border-indigo-200/40 shadow-[0_4px_12px_rgba(99,102,241,0.03)]",
      indicatorClass: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]",
      iconColor: "text-indigo-500",
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
      icon: CreditCard,
      active: pathname === "/dashboard/billing",
      activeClass: "bg-emerald-50/70 text-emerald-600 border-emerald-200/40 shadow-[0_4px_12px_rgba(16,185,129,0.03)]",
      indicatorClass: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <nav className="mx-6 mt-6 space-y-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 border relative overflow-hidden group ${
              link.active
                ? link.activeClass
                : "text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-100"
            }`}
          >
            {/* Hover/Active Subtle Glow Indicator */}
            {link.active && (
              <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r ${link.indicatorClass}`} />
            )}
            <Icon
              className={`h-4.5 w-4.5 transition-colors duration-200 ${
                link.active ? link.iconColor : "text-slate-400 group-hover:text-slate-650"
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-wider">{link.label}</span>
          </Link>
        );
      })}

      {isAdmin && (
        <Link
          href="/dashboard/admin"
          className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 border relative overflow-hidden group ${
            pathname === "/dashboard/admin"
              ? "bg-amber-50/70 text-amber-600 border-amber-200/40 shadow-[0_4px_12px_rgba(245,158,11,0.03)]"
              : "text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-100"
          }`}
        >
          {pathname === "/dashboard/admin" && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
          )}
          <Shield
            className={`h-4.5 w-4.5 transition-colors duration-200 ${
              pathname === "/dashboard/admin" ? "text-amber-500" : "text-slate-400 group-hover:text-slate-650"
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-wider">Admin Panel</span>
        </Link>
      )}
    </nav>
  );
}
