"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, LogIn, ShieldCheck, Sparkles } from "lucide-react";

import { AuthMessage } from "@/components/auth/auth-message";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message || "Invalid email or password.");
        return;
      }

      const user = data.user;

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.is_admin === true) {
          router.push("/dashboard/admin");
          router.refresh();
          return;
        }
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
    <main className="min-h-screen bg-[#FAFBFE] text-slate-900 font-sans">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.08),transparent_40%),linear-gradient(180deg,#ffffff_0%,#FAFBFE_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 lg:px-10 animate-fade-in-up">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/60 p-[1px] shadow-[0_24px_60px_rgba(15,23,42,0.04)] backdrop-blur-xl">
          <div className="rounded-[calc(2rem-1px)] bg-white/80 p-8 sm:p-10 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-3 text-teal-600 shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                  Zenovee AI
                </p>
                <p className="mt-1 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Secure Workspace</p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Sign in to access your dashboard, AI tools, and protected business workflows.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <AuthMessage message={error} tone="error" />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-1 focus:ring-teal-400 shadow-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-1 focus:ring-teal-400 shadow-sm"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 font-medium text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600 focus:ring-offset-0 cursor-pointer"
                    />
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-[1px] active:scale-[0.98] disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                {isLoading ? (
                  <>
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Access Workspace
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-50/80 p-3 text-xs font-medium text-slate-500 border border-slate-100">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Protected by enterprise security
            </div>

            <p className="mt-8 text-center text-sm font-medium text-slate-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-500 transition-colors font-bold">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
