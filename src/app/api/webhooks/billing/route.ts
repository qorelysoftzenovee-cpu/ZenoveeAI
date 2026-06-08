import "server-only";

import { NextResponse, type NextRequest } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

type BillingWebhookPayload = {
  type?: string;
  data?: {
    userId?: string;
    creditsToAdd?: number;
  };
};

export async function POST(request: NextRequest) {
  // TODO: Verify the webhook signature before trusting the payload.
  // Stripe example: use STRIPE_WEBHOOK_SECRET and stripe.webhooks.constructEvent(...)
  // Razorpay example: validate x-razorpay-signature using your webhook secret.
  // Never process billing events without signature verification in production.

  // TODO: Add your provider secret to environment variables, for example:
  // STRIPE_WEBHOOK_SECRET=...
  // or
  // RAZORPAY_WEBHOOK_SECRET=...

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

  let payload: BillingWebhookPayload;

  try {
    payload = (await request.json()) as BillingWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  const isSuccessfulPayment =
    payload.type === "subscription.payment_succeeded" ||
    payload.type === "invoice.payment_succeeded" ||
    payload.type === "payment.captured";

  if (!isSuccessfulPayment) {
    return NextResponse.json({ received: true, skipped: true });
  }

  const userId = payload.data?.userId;
  const creditsToAdd = payload.data?.creditsToAdd ?? 1500;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId in billing payload." }, { status: 400 });
  }

  const { data: profile, error: fetchError } = await supabaseAdmin
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const nextCredits = (profile?.credits ?? 0) + creditsToAdd;

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({
      tier: "pro",
      credits: nextCredits,
    })
    .eq("id", userId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ received: true, upgraded: true, credits: nextCredits });
}
