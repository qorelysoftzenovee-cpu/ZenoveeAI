import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CreditCard,
  LayoutGrid,
  LogOut,
  PanelLeft,
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
    .select("credits")
    .eq("id", user.id)
    .maybeSingle();

  const name =
    (user.user_metadata.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Member";

  async function logout() {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.16),transparent_20%),linear-gradient(180deg,#081120_0%,#050816_60%,#04050d_100%)]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:px-10">
        <aside className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur lg:sticky lg:top-8 lg:max-w-[310px] lg:self-start">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Pro-Suite 50
              </p>
              <p className="mt-1 text-sm text-white/55">Premium internal workspace</p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#08101f] p-5 shadow-lg shadow-cyan-950/20">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Signed in as</p>
            <p className="mt-3 break-all text-sm font-medium text-white/90">{user.email}</p>

            <div className="mt-6 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Live balance
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">{profile?.credits ?? 0}</p>
              <p className="mt-2 text-sm text-emerald-100/80">Credits Available</p>
            </div>
          </div>

          <nav className="mt-8 space-y-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <LayoutGrid className="h-4 w-4 text-cyan-300" />
              All Tools
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <CreditCard className="h-4 w-4 text-violet-300" />
              Billing
            </Link>
          </nav>

          <form action={logout} className="mt-8">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </aside>

        <section className="min-w-0 flex-1">
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
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                  Browse and launch your AI-powered B2B tool suite through a polished internal workspace with a live credit wallet and scalable category architecture.
                </p>
              </div>
            </div>
          </header>

          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
