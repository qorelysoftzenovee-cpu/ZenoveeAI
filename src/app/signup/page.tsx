"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthMessage } from "@/components/auth/auth-message";
import { AuthShell } from "@/components/auth/auth-shell";
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
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
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
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Something went wrong while creating your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      badge="Create account"
      title="Start your premium Pro-Suite 50 workspace."
      description="Set up secure access for yourself or your team and begin building a professional B2B platform experience."
      footerText="Already registered?"
      footerLinkHref="/login"
      footerLinkLabel="Log in instead"
    >
      <div className="rounded-[1.5rem] border border-white/10 bg-[#08101f] p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Create account</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Register with your work details to unlock your secure dashboard.
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <AuthMessage message={error} tone="error" />
          <AuthMessage message={success} tone="success" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="password">
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-white/80"
              htmlFor="confirmPassword"
            >
              Confirm password
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating your account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/55">
          If email verification is enabled, we’ll ask you to confirm your inbox first. If it’s disabled, you’ll be securely redirected straight into your dashboard.
        </div>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have access?{" "}
          <Link href="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
