"use client";

import { Check, CreditCard, Loader2, Sparkles, Wallet } from "lucide-react";
import Script from "next/script";
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
    <div className="space-y-8 animate-fade-in-up text-slate-200">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      
      {/* License Management Header */}
      <section className="rounded-[2rem] border border-[#1C2C55]/60 bg-[#0D1527]/50 p-6 shadow-lg shadow-black/25 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-950/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400 font-mono">
              <Sparkles className="h-3.5 w-3.5" />
              Consolidation Center // Licenses
            </div>
            <h2 className="text-2xl font-bold font-mono tracking-tight text-slate-100 uppercase sm:text-3xl">System License Profile</h2>
            <p className="max-w-2xl text-xs leading-relaxed text-slate-400 font-sans">
              Upgrade your operator license tier, allocate credit capacities, and acquire on-demand top-ups for high-throughput computation cycles.
            </p>
          </div>

          {/* Holographic Developer License passport */}
          <div className="rounded-2xl border border-[#1C2C55] bg-[#080C14] p-5 shadow-inner font-mono text-[10px] leading-relaxed min-w-[290px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-[#1C2C55]/50 pb-2 mb-3">
              <span className="font-bold text-[#4C5D8B]">// SECURITY SYSTEM</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Valid
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-slate-500">KEY:</span> ZN-CRD-{(profile?.id || "guest").slice(0, 8).toUpperCase()}</p>
              <p><span className="text-slate-500">CLASS:</span> {tierLabel.toUpperCase()}_PASS</p>
              <p><span className="text-slate-500">BALANCE:</span> {isLoadingProfile ? "..." : profile?.credits ?? 0} CREDITS</p>
              <p><span className="text-slate-500">STATUS:</span> ACTIVE_STABLE</p>
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-2xl border border-rose-950 bg-rose-950/20 px-4 py-3 text-xs font-mono text-rose-400">
            [FATAL] {errorMessage}
          </div>
        ) : null}

        {statusMessage ? (
          <div className="mt-6 rounded-2xl border border-emerald-950 bg-emerald-950/20 px-4 py-3 text-xs font-mono text-emerald-400">
            [OK] {statusMessage}
          </div>
        ) : null}
      </section>

      {/* Pricing options */}
      <section className="grid gap-6 xl:grid-cols-3">
        {purchaseOptions.map((option) => (
          <article
            key={option.id}
            className={`rounded-[2rem] border p-6 backdrop-blur sm:p-8 flex flex-col justify-between ${
              option.id === "power-plan"
                ? "border-teal-500/30 bg-[#0D1527]/80 shadow-[0_0_20px_rgba(20,184,166,0.08)]"
                : "bg-[#0D1527]/40 border-[#1C2C55]/50 shadow-md"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-tight">{option.title.split(" ")[1] || option.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 font-sans">{option.description}</p>
                </div>
                <div className={`rounded-xl border p-2.5 ${
                  option.id === "starter-plan"
                    ? "border-teal-500/20 bg-teal-950/20 text-teal-400"
                    : option.id === "power-plan"
                      ? "border-purple-500/20 bg-purple-950/20 text-purple-400"
                      : option.id === "agency-suite"
                        ? "border-rose-500/20 bg-rose-950/20 text-rose-400"
                        : "border-[#1C2C55] bg-[#080C14] text-slate-400"
                }`}>
                  {option.id === "credit-topup" ? (
                    <Wallet className="h-4.5 w-4.5" />
                  ) : (
                    <CreditCard className="h-4.5 w-4.5" />
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#1C2C55]/60 bg-[#080C14] p-4 font-mono">
                <p className="text-2xl font-bold text-slate-100">{option.price}</p>
                <p className="mt-1 text-[10px] text-slate-500 uppercase tracking-wider">
                  {option.id === "starter-plan"
                    ? "100 runs / month"
                    : `+ ${option.credits.toLocaleString()} credits`}
                </p>
              </div>

              <div className="mt-6 space-y-2.5">
                {option.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-400 font-sans">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => void openCheckout(option)}
              disabled={isLoadingProfile || activePurchaseId === option.id}
              className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                option.id === "power-plan"
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-lg shadow-teal-500/15"
                  : "bg-[#080C14] border border-[#1C2C55] text-slate-300 hover:text-slate-100 hover:bg-[#0D1527]"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {activePurchaseId === option.id ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Opening connection...
                </>
              ) : (
                option.cta.toUpperCase()
              )}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}