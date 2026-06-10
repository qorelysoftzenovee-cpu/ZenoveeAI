import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BarChart3, Coins, DollarSign, Search, ShieldCheck, Users } from "lucide-react";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/utils/supabase/server";

type AdminPageProps = {
  searchParams?: Promise<{
    query?: string;
  }>;
};

type ProfileRow = {
  id: string;
  credits: number | null;
  tier: "free" | "pro" | "agency" | "trial" | null;
  is_admin: boolean | null;
};

function getGrantedCreditsForTier(tier: ProfileRow["tier"]) {
  switch (tier) {
    case "agency":
      return 6000;
    case "pro":
      return 1500;
    case "trial":
      return 50;
    default:
      return 10;
  }
}

function getEstimatedRevenueForTier(tier: ProfileRow["tier"]) {
  switch (tier) {
    case "agency":
      return 149;
    case "pro":
      return 49;
    case "trial":
      return 8;
    default:
      return 0;
  }
}

export default async function AdminDashboardPage({ searchParams }: AdminPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const query = params?.query?.trim().toLowerCase() ?? "";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (adminProfile?.is_admin !== true) {
    redirect("/dashboard");
  }

  const supabaseAdmin = createAdminClient();

  const [{ data: profiles, error: profilesError }, { data: authUsersData, error: authUsersError }] =
    await Promise.all([
      supabaseAdmin.from("profiles").select("id, credits, tier, is_admin").order("id"),
      supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    ]);

  if (profilesError) {
    throw new Error(profilesError.message);
  }

  if (authUsersError) {
    throw new Error(authUsersError.message);
  }

  const allProfiles = (profiles ?? []) as ProfileRow[];
  const emailLookup = new Map(
    (authUsersData?.users ?? []).map((authUser) => [authUser.id, authUser.email ?? "unknown@example.com"]),
  );

  const filteredProfiles = allProfiles.filter((profile) => {
    const email = emailLookup.get(profile.id)?.toLowerCase() ?? "";
    const tier = (profile.tier ?? "free").toLowerCase();

    if (!query) {
      return true;
    }

    return email.includes(query) || tier.includes(query) || profile.id.toLowerCase().includes(query);
  });

  const totalPlatformUsers = allProfiles.length;
  const groqApiCallVolume = allProfiles.reduce((sum, profile) => {
    const granted = getGrantedCreditsForTier(profile.tier);
    const currentBalance = profile.credits ?? 0;
    return sum + Math.max(0, granted - currentBalance);
  }, 0);
  const grossRevenueLedger = allProfiles.reduce(
    (sum, profile) => sum + getEstimatedRevenueForTier(profile.tier),
    0,
  );

  async function manageCreditsAction(formData: FormData) {
    "use server";

    const userId = formData.get("userId")?.toString();
    const adjustmentRaw = formData.get("creditAdjustment")?.toString();

    if (!userId || !adjustmentRaw) {
      return;
    }

    const adjustment = Number(adjustmentRaw);
    if (Number.isNaN(adjustment)) {
      return;
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { data: currentAdminProfile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (currentAdminProfile?.is_admin !== true) {
      redirect("/dashboard");
    }

    const supabaseAdmin = createAdminClient();
    const { data: targetProfile } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .maybeSingle();

    const nextCredits = Math.max(0, (targetProfile?.credits ?? 0) + adjustment);

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ credits: nextCredits })
      .eq("id", userId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    revalidatePath("/dashboard/admin");
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(34,211,238,0.12),transparent_18%),linear-gradient(180deg,#030712_0%,#020617_100%)]" />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <section className="rounded-[2rem] border border-slate-800/80 bg-[#111827]/50 p-6 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Administrative Command Center
              </div>
              <h1 className="mt-4 text-4xl font-semibold text-white">Admin operations dashboard</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                Monitor platform growth, track operational usage, review revenue posture, and manage user credit balances from one isolated executive workspace.
              </p>
            </div>

            <form className="w-full max-w-sm" action="/dashboard/admin" method="get">
              <label htmlFor="query" className="mb-2 block text-sm font-medium text-white">
                Search users
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-800/80 bg-[#111827]/70 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  id="query"
                  name="query"
                  defaultValue={query}
                  placeholder="Search by email, tier, or ID"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </form>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] border border-slate-800/80 bg-[#111827]/50 p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Total Platform Users</p>
                <p className="mt-3 text-3xl font-semibold text-white">{totalPlatformUsers}</p>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-800/80 bg-[#111827]/50 p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Groq API Call Volume</p>
                <p className="mt-3 text-3xl font-semibold text-white">{groqApiCallVolume.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-emerald-200">
                <Coins className="h-5 w-5" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-800/80 bg-[#111827]/50 p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Gross Revenue Ledger</p>
                <p className="mt-3 text-3xl font-semibold text-white">${grossRevenueLedger.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-violet-300/20 bg-violet-400/10 p-3 text-violet-200">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-800/80 bg-[#111827]/50 p-6 backdrop-blur-md sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">User management ledger</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Review user access tiers, inspect live balances, and apply instant credit adjustments from a single database-facing control table.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.28em] text-slate-500">
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Tier</th>
                  <th className="px-4 py-2">Credit Balance</th>
                  <th className="px-4 py-2">Admin</th>
                  <th className="px-4 py-2">Manage Credits</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="text-sm text-slate-200">
                    <td className="rounded-l-2xl border border-slate-800/80 border-r-0 bg-[#0F172A] px-4 py-4 align-top">
                      <div>
                        <p className="font-medium text-white">{emailLookup.get(profile.id) ?? "unknown@example.com"}</p>
                        <p className="mt-1 text-xs text-slate-500">{profile.id}</p>
                      </div>
                    </td>
                    <td className="border border-slate-800/80 border-r-0 bg-[#0F172A] px-4 py-4 align-top">
                      <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200">
                        {(profile.tier ?? "free").toUpperCase()}
                      </span>
                    </td>
                    <td className="border border-slate-800/80 border-r-0 bg-[#0F172A] px-4 py-4 align-top">
                      <span className="font-semibold text-white">{profile.credits ?? 0}</span>
                    </td>
                    <td className="border border-slate-800/80 border-r-0 bg-[#0F172A] px-4 py-4 align-top">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          profile.is_admin
                            ? "border border-amber-300/20 bg-amber-400/10 text-amber-200"
                            : "border border-slate-700 bg-slate-800/70 text-slate-400"
                        }`}
                      >
                        {profile.is_admin ? "ADMIN" : "STANDARD"}
                      </span>
                    </td>
                    <td className="rounded-r-2xl border border-slate-800/80 bg-[#0F172A] px-4 py-4 align-top">
                      <form action={manageCreditsAction} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input type="hidden" name="userId" value={profile.id} />
                        <input
                          name="creditAdjustment"
                          type="number"
                          step="1"
                          placeholder="e.g. +100 or -50"
                          className="w-full rounded-xl border border-slate-700 bg-[#161C2A] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500 sm:max-w-[190px]"
                          required
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-violet-600 active:scale-[0.99]"
                        >
                          Apply
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}