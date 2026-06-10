import "server-only";

import { NextResponse, type NextRequest } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/utils/supabase/server";

type UpdateCreditsRequest = {
  userId: string;
  creditAmount: number;
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: adminProfile, error: adminProfileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (adminProfileError || adminProfile?.is_admin !== true) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: UpdateCreditsRequest;

  try {
    payload = (await request.json()) as UpdateCreditsRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { userId, creditAmount } = payload;

  if (!userId || typeof creditAmount !== "number" || Number.isNaN(creditAmount)) {
    return NextResponse.json(
      { error: "userId and creditAmount are required." },
      { status: 400 },
    );
  }

  const supabaseAdmin = createAdminClient();
  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ credits: creditAmount })
    .eq("id", userId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, userId, creditAmount });
}