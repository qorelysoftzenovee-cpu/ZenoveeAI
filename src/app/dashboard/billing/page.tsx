"use client";

import { Check, CreditCard, Loader2, Sparkles, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/utils/supabase/client";

type UserProfile = {
  id: string;
  email: string;
  tier: "free" | "pro" | "agency" | "trial";
  credits: number;
};

type PurchaseOption = {
  id: "starter-plan" | "power-plan" | "agency-suite" | "credit-topup";
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
    id: "starter-plan",
    title: "$19/mo Starter Pass",
    price: "$19/mo",
    amountInPaise: 1900,
    credits: 100,
    description:
      "A lightweight monthly starter tier for focused solo execution across the full workspace.",
    tier: "pro",
    cta: "Activate Starter Pass",
    features: [
      "100 generation runs / month",
      "Starter access across the full tool suite",
      "Best for individual operators and early testing",
    ],
  },
  {
    id: "power-plan",
    title: "$79/mo Power User Pass",
    price: "$79/mo",
    amountInPaise: 7900,
    credits: 3000,
    description:
      "A high-throughput monthly tier for serious operators who need more execution headroom and saved answer history.",
    tier: "pro",
    cta: "Activate Power User Pass",
    features: [
      "3,000 monthly credits",
      "Save History activated",
      "Best for repeat research, writing, and optimization cycles",
    ],
  },
  {
    id: "agency-suite",
    title: "$249/mo Team/Agency Suite",
    price: "$249/mo",
    amountInPaise: 24900,
    credits: 10000,
    description:
      "The highest-capacity monthly package for team execution, client delivery, and multi-seat operational workflows.",
    tier: "agency",
    cta: "Activate Team/Agency Suite",
    features: [
      "10,000 high-tier runs",
      "3 seat licenses included",
      "Built for agency-scale and team-based production",
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
      case "trial":
        return "Launch Trial";
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
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              Monetization Center
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Scale your execution capacity</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              Upgrade your workspace tier, expand recurring monthly credits, and add on-demand top-ups for high-intensity execution cycles.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#101522] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Current tier</p>
              <p className="mt-3 text-2xl font-semibold text-white">{tierLabel}</p>
            </div>
            <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Current credits</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {isLoadingProfile ? "..." : profile?.credits ?? 0}
              </p>
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
            className={`rounded-[2rem] border p-6 backdrop-blur sm:p-8 ${
              option.id === "starter-plan"
                ? "border-amber-300/25 bg-gradient-to-br from-amber-400/12 via-white/5 to-violet-400/10 shadow-2xl shadow-amber-950/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">{option.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{option.description}</p>
              </div>
                <div className={`rounded-2xl border p-3 ${
                  option.id === "starter-plan"
                    ? "border-amber-300/20 bg-amber-400/10 text-amber-200"
                    : "border-violet-300/20 bg-violet-400/10 text-violet-200"
                }`}>
                {option.id === "credit-topup" ? (
                  <Wallet className="h-5 w-5" />
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#101522] p-5">
              <p className="text-3xl font-semibold text-white">{option.price}</p>
              <p className="mt-2 text-sm text-cyan-200">
                {option.id === "starter-plan"
                  ? "100 generation runs / month"
                  : `+ ${option.credits.toLocaleString()} credits`}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {option.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => void openCheckout(option)}
              disabled={isLoadingProfile || activePurchaseId === option.id}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
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
  );
}