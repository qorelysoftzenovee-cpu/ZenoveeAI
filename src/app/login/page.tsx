import Link from "next/link";

import { AuthMessage } from "@/components/auth/auth-message";
import { AuthShell } from "@/components/auth/auth-shell";
import { login } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};

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

        <div className="space-y-4">
          <AuthMessage message={params.error} tone="error" />
          <AuthMessage message={params.message} tone="success" />
        </div>

        <form action={login} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="email">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-white/80" htmlFor="password">
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
          >
            Log in to dashboard
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/55">
          New here? <Link href="/signup" className="font-semibold text-cyan-300">Create your account</Link>
          {" "}and you’ll be redirected to your dashboard as soon as authentication completes.
        </div>
      </div>
    </AuthShell>
  );
}
