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
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
      icon: CreditCard,
      active: pathname === "/dashboard/billing",
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
                ? "bg-[#0D1527] text-teal-400 border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.08)]"
                : "text-slate-400 border-transparent hover:bg-[#0D1527]/30 hover:text-slate-100 hover:border-[#1C2C55]/50"
            }`}
          >
            {/* Hover/Active Subtle Glow Indicator */}
            {link.active && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400 rounded-r shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            )}
            <Icon
              className={`h-4.5 w-4.5 transition-colors duration-200 ${
                link.active ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300"
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
              ? "bg-[#0D1527] text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.08)]"
              : "text-slate-400 border-transparent hover:bg-[#0D1527]/30 hover:text-slate-100 hover:border-[#1C2C55]/50"
          }`}
        >
          {pathname === "/dashboard/admin" && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-r shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
          )}
          <Shield
            className={`h-4.5 w-4.5 transition-colors duration-200 ${
              pathname === "/dashboard/admin" ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-wider">Admin Panel</span>
        </Link>
      )}
    </nav>
  );
}
