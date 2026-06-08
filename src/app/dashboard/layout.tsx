import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { createClient } from "@/lib/supabase/server";

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

  return (
    <DashboardShell
      credits={profile?.credits ?? 0}
      title={`Welcome back, ${name}`}
      description="Your workspace stays connected to live credits, protected routing, and premium tool navigation across the full suite."
      userName={name}
      userEmail={user.email}
      currentPath="/dashboard"
    >
      {children}
    </DashboardShell>
  );
}
