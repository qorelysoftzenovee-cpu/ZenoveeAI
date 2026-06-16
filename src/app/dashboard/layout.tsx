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
    <main className="min-h-screen bg-[#FAFBFE] text-[#1E293B]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[300px] shrink-0 border-r border-slate-200/80 bg-white xl:flex xl:flex-col">
          <div className="flex items-center gap-3 p-6 pb-0">
            <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-2.5 text-indigo-600 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">
                Zenovee AI
              </p>
              <p className="text-[11px] text-slate-500">Premium workspace</p>
            </div>
          </div>

          <div className="mx-6 mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Signed in as</p>
            <div className="mt-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 border border-slate-100">
               <Mail className="h-3.5 w-3.5 text-slate-400" />
               <p className="break-all text-xs font-medium text-slate-700 truncate">{user.email}</p>
            </div>

            <div className="mt-4 rounded-xl border border-slate-100 bg-white p-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Credits
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900">{credits}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-500 transition-all duration-500"
                  style={{ width: `${creditProgress}%` }}
                />
              </div>
            </div>
          </div>

          <nav className="mx-6 mt-6 space-y-1.5">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <LayoutGrid className="h-4 w-4 text-slate-400" />
              All Tools
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <CreditCard className="h-4 w-4 text-slate-400" />
              Billing
            </Link>
            {isAdmin ? (
              <Link
                href="/dashboard/admin"
                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-2.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
              >
                <Shield className="h-4 w-4 text-indigo-500" />
                Admin Panel
              </Link>
            ) : null}
          </nav>

          <form action={logout} className="mx-6 mt-auto pb-6 pt-6">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="h-screen overflow-y-auto p-6 md:p-10">
            <header className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <PanelLeft className="h-3.5 w-3.5" />
                    Internal platform
                  </div>
                  <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Welcome back, {name}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                    Browse and launch your AI-powered tools through a premium workspace.
                  </p>
                </div>
              </div>
            </header>

            <div className="mt-6">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
