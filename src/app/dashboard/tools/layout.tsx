import { redirect } from "next/navigation";

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

  return <>{children}</>;
}
