import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CreditCard,
  LayoutGrid,
  LogOut,
  Mail,
  PanelLeft,
  Shield,
  Sparkles,
} from "lucide-react";

import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Please log in to continue.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  const name =
    (user.user_metadata.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Member";
  const credits = profile?.credits ?? 0;
  const isAdmin = profile?.is_admin === true;
  const creditProgress = Math.min(100, Math.max(6, Math.round((credits / 1500) * 100)));

  async function logout() {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.14),transparent_24%),radial-gradient(circle_at_80%_16%,rgba(34,211,238,0.12),transparent_18%),linear-gradient(180deg,#0B0F19_0%,#0B0F19_55%,#070A12_100%)]" />

      <div className="flex min-h-screen">
        <aside className="hidden w-[320px] shrink-0 border-r border-white/10 bg-[#0F1422]/90 backdrop-blur xl:flex xl:flex-col">
          <div className="flex items-center gap-3">
            <div className="m-8 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="-ml-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Pro-Suite 50
              </p>
              <p className="mt-1 text-sm text-slate-400">Premium internal workspace</p>
            </div>
          </div>

          <div className="mx-8 mt-2 rounded-[1.75rem] border border-white/10 bg-[#11182A] p-5 shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signed in as</p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Mail className="h-4 w-4 text-cyan-300" />
              <p className="break-all text-sm font-medium text-slate-100">{user.email}</p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                    Credits Available
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">{credits}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100">
                  Live
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300"
                  style={{ width: `${creditProgress}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-emerald-100/80">
                Premium wallet progress track linked directly to your live profile balance.
              </p>
            </div>
          </div>

          <nav className="mx-8 mt-8 space-y-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <LayoutGrid className="h-4 w-4 text-cyan-300" />
              All Tools
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <CreditCard className="h-4 w-4 text-violet-300" />
              Billing
            </Link>
            {isAdmin ? (
              <Link
                href="/dashboard/admin"
                className="flex items-center gap-3 rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-100 transition hover:bg-amber-400/15 hover:text-white"
              >
                <Shield className="h-4 w-4 text-amber-300" />
                Admin Panel
              </Link>
            ) : null}
          </nav>

          <form action={logout} className="mx-8 mt-auto pb-8 pt-8">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="h-screen overflow-y-auto p-8 md:p-12">
            <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                    <PanelLeft className="h-3.5 w-3.5" />
                    Internal platform
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
                    Welcome back, {name}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                    Browse and launch your AI-powered B2B suite through a premium internal workspace designed for category scale, live credit visibility, and smoother execution.
                  </p>
                </div>
              </div>
            </header>

            <div className="mt-8">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
