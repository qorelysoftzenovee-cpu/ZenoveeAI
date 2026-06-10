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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter them carefully.");
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
        setError(signUpError.message || "Unable to create your account.");
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
          ? error.message
          : "Something went wrong while creating your account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_24%),linear-gradient(180deg,#0f172a_0%,#020617_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 lg:px-10">
        <div className="w-full max-w-md rounded-[2rem] border border-violet-400/20 bg-slate-900/85 p-[1px] shadow-[0_0_80px_rgba(139,92,246,0.16)] backdrop-blur-xl">
          <div className="rounded-[calc(2rem-1px)] bg-[#0F172A] p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-3 text-violet-200">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-300">
                  Pro-Suite 50
                </p>
                <p className="mt-1 text-sm text-slate-400">Secure premium workspace registration</p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Register your workspace access and unlock the premium dashboard, internal tools, and billing controls.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Account verification and protected session access handled securely through Supabase
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <AuthMessage message={error} tone="error" />
              <AuthMessage message={success} tone="success" />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Choose a secure password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="confirmPassword">
                  Password confirmation
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
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

            <p className="mt-6 text-sm leading-7 text-slate-400">
              After signup, please check your email inbox for your verification message before signing in.
            </p>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already registered?{" "}
              <Link href="/login" className="font-semibold text-violet-300 transition hover:text-violet-200">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
