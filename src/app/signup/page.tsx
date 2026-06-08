import Link from "next/link";

import { signup } from "@/app/auth/actions";
import { AuthMessage } from "@/components/auth/auth-message";
import { AuthShell } from "@/components/auth/auth-shell";

type SignupPageProps = {
  searchParams?: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = (await searchParams) ?? {};

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

        <div className="space-y-4">
          <AuthMessage message={params.error} tone="error" />
          <AuthMessage message={params.message} tone="success" />
        </div>

        <form action={signup} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Your full name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

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
            <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Choose a secure password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/8"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/55">
          By continuing, you’re preparing a secure workspace for your B2B tools platform. If email confirmation is enabled in Supabase, your confirmation link will send you to the dashboard after verification.
        </div>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have access? <Link href="/login" className="font-semibold text-cyan-300">Sign in</Link>
        </p>
      </div>
    </AuthShell>
  );
}
