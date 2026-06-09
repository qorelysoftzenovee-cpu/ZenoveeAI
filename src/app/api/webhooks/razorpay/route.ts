import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        notes?: {
          userId?: string;
          planId?: string;
        };
      };
    };
  };
};

type PlanUpdate = {
  creditsToAdd: number;
  tier: "free" | "pro" | "agency" | null;
};

function getPlanUpdate(planId?: string): PlanUpdate | null {
  if (planId === "professional-access") {
    return { creditsToAdd: 1500, tier: "pro" };
  }

  if (planId === "agency-scaling") {
    return { creditsToAdd: 6000, tier: "agency" };
  }

  if (planId === "credit-topup") {
    return { creditsToAdd: 500, tier: null };
  }

  return null;
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-razorpay-signature")?.trim();
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Razorpay signature or webhook secret." },
      { status: 400 },
    );
  }

  const rawBody = await request.text();
  const digest = createHmac("sha256", webhookSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "utf8");
  const digestBuffer = Buffer.from(digest, "utf8");

  if (
    signatureBuffer.length !== digestBuffer.length ||
    !timingSafeEqual(signatureBuffer, digestBuffer)
  ) {
    return NextResponse.json({ error: "Invalid Razorpay signature." }, { status: 401 });
  }

  let supabaseAdmin;

  try {
    supabaseAdmin = createAdminClient();
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Admin Supabase client is not configured.",
      },
      { status: 500 },
    );
  }

  let payload: RazorpayWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid Razorpay payload." }, { status: 400 });
  }

  const isSuccessfulEvent =
    payload.event === "payment.captured" || payload.event === "subscription.activated";

  if (!isSuccessfulEvent) {
    return new NextResponse(null, { status: 200 });
  }

  const paymentNotes = payload.payload?.payment?.entity?.notes;
  const userId = paymentNotes?.userId;
  const planId = paymentNotes?.planId;

  const planUpdate = getPlanUpdate(planId);

  if (!userId || !planUpdate) {
    return NextResponse.json(
      { error: "Missing or invalid purchase metadata in Razorpay notes." },
      { status: 400 },
    );
  }

  const { data: profile, error: fetchError } = await supabaseAdmin
    .from("profiles")
    .select("credits, tier")
    .eq("id", userId)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const nextCredits = (profile?.credits ?? 0) + planUpdate.creditsToAdd;
  const nextTier = planUpdate.tier ?? ((profile?.tier as "free" | "pro" | "agency" | null) ?? "free");

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ tier: nextTier, credits: nextCredits })
    .eq("id", userId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}