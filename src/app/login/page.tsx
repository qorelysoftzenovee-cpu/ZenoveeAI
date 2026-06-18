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
              <h1 className="text-2xl font-bold font-mono tracking-tight text-slate-100 uppercase">System Login</h1>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                Establish a session connection to access tools, dashboards, and automated workspace runners.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <AuthMessage message={error} tone="error" />
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
                  className="w-full rounded-xl border border-[#1C2C55] bg-[#080C14] px-4 py-3.5 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-605 focus:border-teal-500/50 focus:bg-[#080C14] focus:ring-1 focus:ring-teal-500/10 shadow-inner"
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
                    autoComplete="current-password"
                    placeholder="Enter system credentials"
                    className="w-full rounded-xl border border-[#1C2C55] bg-[#080C14] px-4 py-3.5 pr-12 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-605 focus:border-teal-500/50 focus:bg-[#080C14] focus:ring-1 focus:ring-teal-500/10 shadow-inner"
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

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-[#1C2C55] bg-[#080C14] text-teal-600 focus:ring-teal-500/20 cursor-pointer"
                    />
                    Remember connection
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-3.5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-lg shadow-teal-500/15 transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-xl hover:shadow-teal-500/25 hover:-translate-y-[1px] active:scale-[0.98] disabled:cursor-not-allowed disabled:from-slate-800 disabled:to-slate-800 disabled:shadow-none cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                {isLoading ? (
                  <>
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Access Console
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#080C14]/50 p-3 text-[10px] font-mono text-slate-500 border border-[#1C2C55]/60 shadow-inner">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              SESSION ENCRYPTED (AES-256)
            </div>

            <p className="mt-8 text-center text-xs font-mono text-slate-500">
              NO SESSION LOGGED?{" "}
              <Link href="/signup" className="text-teal-400 hover:text-teal-300 transition-colors font-bold uppercase">
                Register Core ID
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
