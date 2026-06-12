"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ShieldCheck, UserPlus } from "lucide-react";

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
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 lg:px-10">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-[1px] shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="rounded-[calc(2rem-1px)] bg-white p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-600">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">
                  Pro-Suite 50
                </p>
                <p className="mt-1 text-sm text-slate-500">Secure premium workspace registration</p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create your account</h1>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Register your workspace access and unlock the premium dashboard, internal tools, and billing controls.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Account verification and protected session access handled securely through Supabase
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <AuthMessage message={error} tone="error" />
              <AuthMessage message={success} tone="success" />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
                  Password
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
                    placeholder="Choose a secure password"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm text-slate-500 hover:text-slate-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all`}
                        style={{ width: `${(score / 4) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{scoreLabel}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                  Password confirmation
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
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm text-slate-500 hover:text-slate-900"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 text-slate-500">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 bg-white text-emerald-500"
                  />
                  <span className="text-sm">I agree to the <a href="#" className="text-emerald-600">Terms</a> and <a href="#" className="text-emerald-600">Privacy Policy</a></span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !termsAccepted}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E63946] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c92a37] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  "Creating your account..."
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-sm leading-7 text-slate-500">
              After signup, please check your email inbox for your verification message before signing in.
            </p>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already registered?{" "}
              <Link href="/login" className="font-semibold text-emerald-600 transition hover:text-emerald-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
