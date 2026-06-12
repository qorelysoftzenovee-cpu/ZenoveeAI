import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CreditCard,
  History,
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

  const { data: historyRows } = await supabase
    .from("generation_history")
    .select("id, tool_id, output_text, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

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
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <div className="absolute inset-0 -z-10 bg-[#F4F7F6]" />

      <div className="flex min-h-screen">
        <aside className="hidden w-[320px] shrink-0 border-r border-slate-200 bg-[#FFFFFF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] xl:flex xl:flex-col">
          <div className="flex items-center gap-3">
            <div className="m-8 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="-ml-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1E293B]">
                Pro-Suite 50
              </p>
              <p className="mt-1 text-sm text-[#64748B]">Premium internal workspace</p>
            </div>
          </div>

          <div className="mx-8 mt-2 rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signed in as</p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] px-4 py-3">
              <Mail className="h-4 w-4 text-[#1E293B]" />
              <p className="break-all text-sm font-medium text-[#1E293B]">{user.email}</p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E293B]">
                    Credits Available
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-[#1E293B]">{credits}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white px-3 py-1 text-xs font-medium text-[#1E293B] border border-slate-200">
                  Live
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500"
                  style={{ width: `${creditProgress}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-[#64748B]">
                Premium wallet progress track linked directly to your live profile balance.
              </p>
            </div>
          </div>

          <nav className="mx-8 mt-8 space-y-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition hover:bg-slate-50"
            >
              <LayoutGrid className="h-4 w-4 text-[#1E293B]" />
              All Tools
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-[#1E293B] transition hover:bg-slate-50"
            >
              <CreditCard className="h-4 w-4 text-violet-300" />
              Billing
            </Link>
            {isAdmin ? (
              <Link
                href="/dashboard/admin"
                className="flex items-center gap-3 rounded-2xl border border-[#FFEFE7] bg-[#FFEFE7] px-4 py-3 text-sm font-medium text-[#C0392B] transition hover:opacity-90"
              >
                <Shield className="h-4 w-4 text-amber-300" />
                Admin Panel
              </Link>
            ) : null}
          </nav>



          <section className="mx-8 mt-8 rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#64748B]">
              <History className="h-3.5 w-3.5 text-[#1E293B]" />
              Saved History
            </div>
            <div className="mt-4 space-y-3">
              {(historyRows ?? []).length > 0 ? (historyRows ?? []).map((entry) => (
                <Link
                  key={entry.id}
                  href={`/dashboard/tools/${entry.tool_id}?history=${entry.id}`}
                  className="block rounded-2xl border border-slate-100 bg-[#F8FAFC] px-4 py-3 transition hover:bg-slate-50"
                >
                  <p className="text-sm font-medium text-[#1E293B]">{entry.tool_id}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#64748B]">{entry.output_text}</p>
                </Link>
              )) : (
                <p className="rounded-2xl border border-slate-100 bg-[#F8FAFC] px-4 py-3 text-sm text-[#64748B]">No saved generations yet.</p>
              )}
            </div>
          </section>

          <form action={logout} className="mx-8 mt-auto pb-8 pt-8">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold text-[#1E293B] transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </aside>

        <section className="min-w-0 flex-1 bg-[#F8FAFC]">
          <div className="h-screen overflow-y-auto bg-[#F8FAFC] p-8 md:p-12">
            <header className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    <PanelLeft className="h-3.5 w-3.5" />
                    Internal platform
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    Welcome back, {name}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
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
