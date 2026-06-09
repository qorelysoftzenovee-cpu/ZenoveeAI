import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardToolsLayout({
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

  const headerStore = await headers();
  const currentPath = headerStore.get("x-pathname") ?? "/dashboard";

  return (
    <DashboardShell
      credits={profile?.credits ?? 0}
      title={`Workspace tools for ${name}`}
      description="Launch live tools, track credits, and switch between modules without leaving the protected dashboard experience."
      userName={name}
      userEmail={user.email}
      currentPath={currentPath}
    >
      {children}
    </DashboardShell>
  );
}
