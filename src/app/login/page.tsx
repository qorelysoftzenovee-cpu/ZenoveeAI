"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthMessage } from "@/components/auth/auth-message";
import { AuthShell } from "@/components/auth/auth-shell";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message || "Invalid email or password.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong while signing you in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      badge="Welcome back"
      title="Log in to your Pro-Suite 50 workspace."
      description="Access your premium dashboard, business tools, and team workflows from one secure control center."
      footerText="Need an account?"
      footerLinkHref="/signup"
      footerLinkLabel="Create one here"
    >
      <div className="rounded-[1.5rem] border border-white/10 bg-[#08101f] p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Use your email and password to enter the dashboard.
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <AuthMessage message={error} tone="error" />
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
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-white/80" htmlFor="password">
                Password
              </label>
              <span className="text-xs text-white/40">Secure access</span>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing you in..." : "Log in to dashboard"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/55">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
            Create your account
          </Link>
          {" "}to unlock your premium workspace.
        </div>
      </div>
    </AuthShell>
  );
}
