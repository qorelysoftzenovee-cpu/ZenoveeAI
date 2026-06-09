"use client";

import Script from "next/script";
import { Check, CreditCard, Loader2, Sparkles, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/utils/supabase/client";

type UserProfile = {
  id: string;
  email: string;
  tier: "free" | "pro" | "agency";
  credits: number;
};

type PurchaseOption = {
  id: "professional-access" | "agency-scaling" | "credit-topup";
  title: string;
  price: string;
  amountInPaise: number;
  credits: number;
  description: string;
  tier: "pro" | "agency" | null;
  cta: string;
  features: string[];
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const purchaseOptions: PurchaseOption[] = [
  {
    id: "professional-access",
    title: "Professional Access",
    price: "$49/mo",
    amountInPaise: 4900,
    credits: 1500,
    description:
      "Built for focused operators who need dependable monthly AI capacity for outreach, research, and SEO execution.",
    tier: "pro",
    cta: "Upgrade to Professional",
    features: [
      "1,500 recurring monthly credits",
      "Priority access to premium B2B tools",
      "Ideal for founders, marketers, and lean teams",
    ],
  },
  {
    id: "agency-scaling",
    title: "Agency Scaling Access",
    price: "$149/mo",
    amountInPaise: 14900,
    credits: 6000,
    description:
      "Designed for high-volume client delivery teams, outbound agencies, and operators scaling multiple campaigns in parallel.",
    tier: "agency",
    cta: "Upgrade to Agency",
    features: [
      "6,000 recurring monthly credits",
      "Better suited for team-wide usage",
      "Supports larger research and execution workloads",
    ],
  },
  {
    id: "credit-topup",
    title: "Top-Up Credits",
    price: "$19 one-time",
    amountInPaise: 1900,
    credits: 500,
    description:
      "Add a flexible burst of extra credits whenever your campaigns, research queues, or production cycles need more room.",
    tier: null,
    cta: "Buy 500 Extra Credits",
    features: [
      "500 extra credits instantly added",
      "One-time top-up for bursts of work",
      "Perfect for active launch windows and experiments",
    ],
  },
];

const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export default function BillingPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [activePurchaseId, setActivePurchaseId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setIsLoadingProfile(true);
      setErrorMessage("");

      try {
        const supabase = createClient();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          if (!cancelled) {
            setErrorMessage("Unable to load billing information. Please log in again.");
          }
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("tier, credits")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          if (!cancelled) {
            setErrorMessage("Unable to fetch your current billing profile.");
          }
          return;
        }

        if (!cancelled) {
          setProfile({
            id: user.id,
            email: user.email ?? "unknown@example.com",
            tier: (profileData?.tier as UserProfile["tier"] | undefined) ?? "free",
            credits: profileData?.credits ?? 0,
          });
        }
      } catch {
        if (!cancelled) {
          setErrorMessage("Something went wrong while loading the billing dashboard.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingProfile(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const tierLabel = useMemo(() => {
    if (!profile) {
      return "Loading...";
    }

    switch (profile.tier) {
      case "agency":
        return "Agency";
      case "pro":
        return "Professional";
      default:
        return "Free";
    }
  }, [profile]);

  async function openCheckout(option: PurchaseOption) {
    setErrorMessage("");
    setStatusMessage("");

    if (!profile) {
      setErrorMessage("Your billing profile is still loading. Please try again in a moment.");
      return;
    }

    if (!razorpayKeyId) {
      setErrorMessage("Missing Razorpay Key ID configuration.");
      return;
    }

    if (!window.Razorpay) {
      setErrorMessage("Razorpay Checkout failed to load. Please refresh and try again.");
      return;
    }

    setActivePurchaseId(option.id);

    try {
      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        amount: option.amountInPaise,
        currency: "USD",
        name: "Pro-Suite 50",
        description: option.title,
        notes: {
          userId: profile.id,
          userEmail: profile.email,
          planId: option.id,
          tier: option.tier ?? profile.tier,
          credits: String(option.credits),
        },
        prefill: {
          email: profile.email,
        },
        theme: {
          color: "#22d3ee",
        },
        handler: () => {
          setStatusMessage(
            "Payment submitted successfully. Your billing webhook will confirm the transaction and update your balance shortly.",
          );
          setActivePurchaseId(null);
        },
        modal: {
          ondismiss: () => {
            setActivePurchaseId(null);
          },
        },
      });

      razorpay.open();
    } catch {
      setErrorMessage("Unable to launch the Razorpay checkout modal. Please try again.");
      setActivePurchaseId(null);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                Monetization Engine
              </div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Billing & credit scaling</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                Upgrade your workspace, expand monthly credit capacity, and unlock higher operational throughput with premium access plans.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#08101f] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-white/40">Current tier</p>
                <p className="mt-3 text-2xl font-semibold text-white">{tierLabel}</p>
              </div>
              <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Current balance</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {isLoadingProfile ? "..." : profile?.credits ?? 0}
                </p>
                <p className="mt-1 text-sm text-emerald-100/80">Credits available</p>
              </div>
            </div>
          </div>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-100">
              {errorMessage}
            </div>
          ) : null}

          {statusMessage ? (
            <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm leading-6 text-emerald-100">
              {statusMessage}
            </div>
          ) : null}
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          {purchaseOptions.map((option) => (
            <article
              key={option.id}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{option.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{option.description}</p>
                </div>
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
                  {option.id === "credit-topup" ? (
                    <Wallet className="h-5 w-5" />
                  ) : (
                    <CreditCard className="h-5 w-5" />
                  )}
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#08101f] p-5">
                <p className="text-3xl font-semibold text-white">{option.price}</p>
                <p className="mt-2 text-sm text-cyan-200">+ {option.credits.toLocaleString()} credits</p>
              </div>

              <div className="mt-6 space-y-3">
                {option.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => void openCheckout(option)}
                disabled={isLoadingProfile || activePurchaseId === option.id}
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {activePurchaseId === option.id ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Opening checkout...
                  </>
                ) : (
                  option.cta
                )}
              </button>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}