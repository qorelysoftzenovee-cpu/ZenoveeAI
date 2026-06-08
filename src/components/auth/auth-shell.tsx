import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  children: ReactNode;
};

export function AuthShell({
  badge,
  title,
  description,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_22%),linear-gradient(180deg,#081120_0%,#050816_60%,#04050d_100%)]" />
      <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_520px] lg:px-10">
        <section className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur xl:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Pro-Suite 50
            </p>
            <div className="mt-10 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-100">
              {badge}
            </div>
            <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Secure", "Supabase authentication and session handling"],
              ["Modern", "Responsive UI built with Next.js and Tailwind CSS"],
              ["Scalable", "Ready to grow into a full B2B tools platform"],
            ].map(([heading, text]) => (
              <div
                key={heading}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="text-sm font-semibold text-white">{heading}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
            {children}
            <p className="mt-8 text-center text-sm text-white/55">
              {footerText}{" "}
              <Link
                href={footerLinkHref}
                className="font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
