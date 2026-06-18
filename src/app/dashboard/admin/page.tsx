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
      return 0;
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
    <div className="text-slate-250 animate-fade-in-up bg-[#080C14] min-h-screen">
      <div className="mx-auto max-w-7xl pb-10">
        {/* Header Section */}
        <section className="rounded-[2rem] border border-[#1C2C55]/60 bg-[#0D1527]/50 p-6 shadow-lg shadow-black/25 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-950/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 animate-pulse" />
                Administrative Control Core
              </div>
              <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 uppercase sm:text-3xl">System Administration</h1>
              <p className="max-w-2xl text-xs leading-relaxed text-slate-400 font-sans">
                Monitor system metrics, review platform transaction posture, and manage registry credit balances from the central operations panel.
              </p>
            </div>

            <form className="w-full max-w-sm" action="/dashboard/admin" method="get">
              <label htmlFor="query" className="mb-2 block text-[10px] font-mono font-bold text-[#4C5D8B] uppercase tracking-widest">
                // SEARCH OPERATORS
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[#1C2C55] bg-[#080C14] px-4 py-3 focus-within:border-teal-500/50 focus-within:ring-1 focus-within:ring-teal-500/20 transition-all font-mono text-xs">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  id="query"
                  name="query"
                  defaultValue={query}
                  placeholder="Enter email or operator ID..."
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
                />
              </div>
            </form>
          </div>
        </section>

        {/* KPIs Section */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] border border-[#1C2C55]/60 bg-[#0D1527]/40 p-6 shadow-md shadow-blue-500/5 hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">OPERATORS REGISTERED</p>
                <p className="mt-3 text-3xl font-bold font-mono text-slate-100">{totalPlatformUsers}</p>
              </div>
              <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-3 text-blue-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#1C2C55]/60 bg-[#0D1527]/40 p-6 shadow-md shadow-emerald-500/5 hover:border-emerald-500/30 hover:shadow-emerald-500/10 transition-all duration-300 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">GROQ DISPATCH VOL</p>
                <p className="mt-3 text-3xl font-bold font-mono text-slate-100">{groqApiCallVolume.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3 text-emerald-400">
                <Coins className="h-5 w-5" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#1C2C55]/60 bg-[#0D1527]/40 p-6 shadow-md shadow-purple-500/5 hover:border-purple-500/30 hover:shadow-purple-500/10 transition-all duration-300 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">EST REVENUE POSTURE</p>
                <p className="mt-3 text-3xl font-bold font-mono text-slate-100">${grossRevenueLedger.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-3 text-purple-400">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </article>
        </section>

        {/* Users Table Section */}
        <section className="mt-8 rounded-[2rem] border border-[#1C2C55]/60 bg-[#0D1527]/50 p-6 shadow-lg shadow-black/25 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-teal-500/20 bg-teal-950/20 p-3 text-teal-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono text-slate-100 uppercase tracking-tight">Operator Ledger</h2>
              <p className="mt-1 text-xs text-slate-400">
                Audit system operators, check remaining credit allowances, and adjust balance limits.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-500">
                  <th className="px-4 py-2">Operator Info</th>
                  <th className="px-4 py-2">License Class</th>
                  <th className="px-4 py-2">Credit Limit</th>
                  <th className="px-4 py-2">Access Role</th>
                  <th className="px-4 py-2">Adjustment Node</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="text-xs">
                    <td className="rounded-l-2xl border border-[#1C2C55]/60 border-r-0 bg-[#080C14] px-4 py-4 align-top">
                      <div>
                        <p className="font-semibold text-slate-200">{emailLookup.get(profile.id) ?? "unknown@example.com"}</p>
                        <p className="mt-1 text-[10px] text-slate-500 font-mono">{profile.id}</p>
                      </div>
                    </td>
                    <td className="border border-[#1C2C55]/60 border-r-0 bg-[#080C14] px-4 py-4 align-top font-mono">
                      <span className="rounded-lg border border-[#1C2C55] bg-[#0D1527] px-2.5 py-1 text-[10px] font-bold text-slate-400 shadow-sm">
                        {(profile.tier ?? "free").toUpperCase()}
                      </span>
                    </td>
                    <td className="border border-[#1C2C55]/60 border-r-0 bg-[#080C14] px-4 py-4 align-top font-mono">
                      <span className="font-bold text-slate-200">{profile.credits ?? 0}</span>
                    </td>
                    <td className="border border-[#1C2C55]/60 border-r-0 bg-[#080C14] px-4 py-4 align-top font-mono">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-[9px] font-bold border ${
                          profile.is_admin
                            ? "border-teal-500/20 bg-teal-950/20 text-teal-400"
                            : "border-[#1C2C55] bg-[#0D1527] text-slate-500"
                        }`}
                      >
                        {profile.is_admin ? "ADMIN" : "STANDARD"}
                      </span>
                    </td>
                    <td className="rounded-r-2xl border border-[#1C2C55]/60 bg-[#080C14] px-4 py-4 align-top">
                      <form action={manageCreditsAction} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input type="hidden" name="userId" value={profile.id} />
                        <input
                          name="creditAdjustment"
                          type="number"
                          step="1"
                          placeholder="+100 or -50"
                          className="w-full rounded-xl border border-[#1C2C55] bg-[#0D1527] px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400 sm:max-w-[140px]"
                          required
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md hover:bg-teal-500 active:scale-95 transition-all cursor-pointer"
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