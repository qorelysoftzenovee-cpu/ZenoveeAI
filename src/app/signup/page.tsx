"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, UserPlus } from "lucide-react";

import { AuthMessage } from "@/components/auth/auth-message";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  function normalizeSignupError(message: string) {
    const lowered = message.toLowerCase();

    if (lowered.includes("email rate limit exceeded")) {
      return "Too many signup attempts were made recently. Please wait a few minutes before requesting another verification email.";
    }

    if (lowered.includes("rate limit")) {
      return "Too many requests were made in a short period. Please wait a few minutes and try again.";
    }

    return message;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter them carefully.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and privacy policy to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const emailRedirectTo = `${window.location.origin}/auth/callback`;
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo,
        },
      });

      if (signUpError) {
        setError(normalizeSignupError(signUpError.message || "Unable to create your account."));
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setSuccess(
        "Your account was created successfully. Please check your email inbox to confirm your address before signing in.",
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        error instanceof Error
          ? normalizeSignupError(error.message)
          : "Something went wrong while creating your account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function computePasswordScore(pw: string) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
  }

  const score = computePasswordScore(password);
  const scoreLabel = ["Very weak", "Weak", "Fair", "Good", "Strong"][score];

  return (
    <main className="min-h-screen bg-[#080C14] text-slate-200 font-sans selection:bg-teal-950 selection:text-teal-400">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.12),transparent_40%),linear-gradient(180deg,#080C14_0%,#05080E_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 lg:px-10 animate-fade-in-up">
        <div className="w-full max-w-md rounded-[2rem] border border-[#1C2C55]/80 bg-[#0D1527]/50 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="rounded-[calc(2rem-1px)] bg-[#0D1527]/85 p-8 sm:p-10 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-teal-500/20 bg-teal-950/40 p-3 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-400 font-mono">
                  Zenovee AI
                </p>
                <p className="mt-1 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Secure Terminal</p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 uppercase">Registry Sign-up</h1>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                Register a new operator ID to gain console clearance and initialize workspace tools.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <AuthMessage message={error} tone="error" />
              <AuthMessage message={success} tone="success" />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-mono font-bold text-[#4C5D8B] uppercase tracking-widest" htmlFor="email">
                  // OPERATOR_EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-[#1C2C55] bg-[#080C14] px-4 py-3.5 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-655 focus:border-teal-500/50 focus:bg-[#080C14] focus:ring-1 focus:ring-teal-500/10 shadow-inner"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-mono font-bold text-[#4C5D8B] uppercase tracking-widest" htmlFor="password">
                  // OPERATOR_PASS
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Set system access key"
                    className="w-full rounded-xl border border-[#1C2C55] bg-[#080C14] px-4 py-3.5 pr-12 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-655 focus:border-teal-500/50 focus:bg-[#080C14] focus:ring-1 focus:ring-teal-500/10 shadow-inner"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[10px] font-mono text-slate-500 hover:text-slate-350 transition-colors"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="h-1 w-full rounded-full bg-[#080C14] border border-[#1C2C55]/30 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-amber-500 to-teal-500 transition-all duration-300`}
                        style={{ width: `${(score / 4) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[9px] font-mono text-slate-500">KEY COMPLEXITY: {scoreLabel.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-mono font-bold text-[#4C5D8B] uppercase tracking-widest" htmlFor="confirmPassword">
                  // CONFIRM_OPERATOR_PASS
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Confirm access key"
                    className="w-full rounded-xl border border-[#1C2C55] bg-[#080C14] px-4 py-3.5 pr-12 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-655 focus:border-teal-500/50 focus:bg-[#080C14] focus:ring-1 focus:ring-teal-500/10 shadow-inner"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[10px] font-mono text-slate-500 hover:text-slate-350 transition-colors"
                  >
                    {showConfirm ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 font-mono text-[11px] text-slate-500 cursor-pointer hover:text-slate-400">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 rounded border-[#1C2C55] bg-[#080C14] text-teal-600 focus:ring-teal-500/20 cursor-pointer"
                  />
                  <span>ACCEPT <Link href="/terms" className="text-teal-400 hover:underline">TERMS</Link> & <Link href="/privacy" className="text-teal-400 hover:underline">PRIVACY</Link></span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !termsAccepted}
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-3.5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-lg shadow-teal-500/15 transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-xl hover:shadow-teal-500/25 hover:-translate-y-[1px] active:scale-[0.98] disabled:cursor-not-allowed disabled:from-slate-800 disabled:to-slate-800 disabled:shadow-none cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                {isLoading ? (
                  <>
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Registering ID...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Register Operator
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#080C14]/50 p-3 text-[10px] font-mono text-slate-500 border border-[#1C2C55]/60 shadow-inner">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              REGISTRATION ENCRYPTED
            </div>

            <p className="mt-8 text-center text-xs font-mono text-slate-500">
              OPERATOR CLEARANCE ACTIVE?{" "}
              <Link href="/login" className="text-teal-400 hover:text-teal-300 transition-colors font-bold uppercase">
                Connect Session
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
