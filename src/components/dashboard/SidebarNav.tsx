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
    <nav className="mx-6 mt-6 space-y-1.5">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 relative overflow-hidden group ${
              link.active
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {/* Hover/Active Subtle Glow Slide */}
            {link.active && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-r" />
            )}
            <Icon
              className={`h-4.5 w-4.5 transition-colors duration-200 ${
                link.active ? "text-teal-400" : "text-slate-400 group-hover:text-slate-600"
              }`}
            />
            <span>{link.label}</span>
          </Link>
        );
      })}

      {isAdmin && (
        <Link
          href="/dashboard/admin"
          className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 relative overflow-hidden group ${
            pathname === "/dashboard/admin"
              ? "bg-teal-950 text-teal-400 border border-teal-800/30 shadow-sm shadow-teal-950/10"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          {pathname === "/dashboard/admin" && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400 rounded-r" />
          )}
          <Shield
            className={`h-4.5 w-4.5 transition-colors duration-200 ${
              pathname === "/dashboard/admin" ? "text-teal-400" : "text-slate-400 group-hover:text-slate-600"
            }`}
          />
          <span>Admin Panel</span>
        </Link>
      )}
    </nav>
  );
}
