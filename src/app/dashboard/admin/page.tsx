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
    <div className="text-slate-900 animate-fade-in-up">
      <div className="mx-auto max-w-7xl pb-10">
        {/* Header Section */}
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Administrative Command Center
              </div>
              <h1 className="mt-4 text-3xl font-bold text-slate-900">Admin Operations Dashboard</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                Monitor platform growth, track operational usage, review revenue posture, and manage user credit balances from one executive workspace.
              </p>
            </div>

            <form className="w-full max-w-sm" action="/dashboard/admin" method="get">
              <label htmlFor="query" className="mb-2 block text-sm font-medium text-slate-700">
                Search users
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300 transition-all">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  id="query"
                  name="query"
                  defaultValue={query}
                  placeholder="Search by email, tier, or ID"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </form>
          </div>
        </section>

        {/* KPIs Section */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Total Platform Users</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{totalPlatformUsers}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3 text-blue-500">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Groq API Call Volume</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{groqApiCallVolume.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-emerald-500">
                <Coins className="h-5 w-5" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Gross Revenue Ledger</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">${grossRevenueLedger.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-3 text-violet-500">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </article>
        </section>

        {/* Users Table Section */}
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-3 text-indigo-500">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">User Management Ledger</h2>
              <p className="mt-1 text-sm leading-7 text-slate-500">
                Review user access tiers, inspect live balances, and apply instant credit adjustments.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Tier</th>
                  <th className="px-4 py-2">Credit Balance</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Manage Credits</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="text-sm">
                    <td className="rounded-l-2xl border border-slate-200 border-r-0 bg-slate-50 px-4 py-4 align-top">
                      <div>
                        <p className="font-medium text-slate-900">{emailLookup.get(profile.id) ?? "unknown@example.com"}</p>
                        <p className="mt-1 text-[11px] text-slate-400 font-mono">{profile.id}</p>
                      </div>
                    </td>
                    <td className="border border-slate-200 border-r-0 bg-slate-50 px-4 py-4 align-top">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm">
                        {(profile.tier ?? "free").toUpperCase()}
                      </span>
                    </td>
                    <td className="border border-slate-200 border-r-0 bg-slate-50 px-4 py-4 align-top">
                      <span className="font-semibold text-slate-900">{profile.credits ?? 0}</span>
                    </td>
                    <td className="border border-slate-200 border-r-0 bg-slate-50 px-4 py-4 align-top">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                          profile.is_admin
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-200/50 text-slate-500"
                        }`}
                      >
                        {profile.is_admin ? "ADMIN" : "STANDARD"}
                      </span>
                    </td>
                    <td className="rounded-r-2xl border border-slate-200 bg-slate-50 px-4 py-4 align-top">
                      <form action={manageCreditsAction} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input type="hidden" name="userId" value={profile.id} />
                        <input
                          name="creditAdjustment"
                          type="number"
                          step="1"
                          placeholder="+100 or -50"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 sm:max-w-[140px]"
                          required
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 active:scale-95"
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
    </div>
  );
}