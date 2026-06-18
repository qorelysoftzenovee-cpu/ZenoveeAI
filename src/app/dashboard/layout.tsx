import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LogOut,
  Mail,
  PanelLeft,
  Sparkles,
} from "lucide-react";

import { createClient } from "@/utils/supabase/server";
import { SidebarNav } from "@/components/dashboard/SidebarNav";

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
    <main className="min-h-screen bg-[#FAFBFE] text-slate-800 selection:bg-teal-100 selection:text-teal-900 font-sans">
      <div className="flex min-h-screen">
        <aside className="hidden w-[300px] shrink-0 border-r border-slate-200/80 bg-white/80 backdrop-blur-xl xl:flex xl:flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 p-6 pb-0">
            <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-2.5 text-teal-600 shadow-sm">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-slate-950 uppercase">
                Zenovee AI
              </p>
              <p className="text-[9px] font-mono text-teal-600 uppercase tracking-widest">Core Workspace</p>
            </div>
          </div>

          <div className="mx-6 mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 shadow-inner">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">Workspace Operator</p>
            <div className="mt-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 border border-slate-100">
               <Mail className="h-3.5 w-3.5 text-slate-400" />
               <p className="break-all text-xs font-mono text-slate-600 truncate">{user.email}</p>
            </div>

            <div className="mt-4 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Tokens
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600 uppercase tracking-wider font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-slate-900 tracking-tight">{credits}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-50 border border-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500 shadow-[0_0_8px_rgba(20,184,166,0.35)]"
                  style={{ width: `${creditProgress}%` }}
                />
              </div>
            </div>
          </div>

          <SidebarNav isAdmin={isAdmin} />

          <form action={logout} className="mx-6 mt-auto pb-6 pt-6">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 cursor-pointer shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          </form>
        </aside>

        <section className="min-w-0 flex-1 bg-[#FAFBFE]">
          <div className="h-screen overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
            <header className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-md p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    NODE // ZEN-CORE-SYSTEMS
                  </div>
                  <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl tracking-tight">
                    Welcome back, <span className="text-teal-600">{name}</span>
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                    Console active. Initialize workflow processes and trigger enterprise-grade generative executions.
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
