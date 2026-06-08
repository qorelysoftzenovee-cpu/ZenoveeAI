import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { dashboardNavigationSections } from "@/lib/dashboard";

type DashboardShellProps = {
  children: React.ReactNode;
  credits: number;
  title: string;
  description: string;
  userName: string;
  userEmail?: string;
  currentPath: string;
};

function isActive(href: string, currentPath: string) {
  if (href === "/dashboard") {
    return currentPath === "/dashboard";
  }

  return currentPath.startsWith(href);
}

export function DashboardShell({
  children,
  credits,
  title,
  description,
  userName,
  userEmail,
  currentPath,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.16),transparent_20%),linear-gradient(180deg,#081120_0%,#050816_60%,#04050d_100%)]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:px-10">
        <aside className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur lg:sticky lg:top-8 lg:max-w-[290px] lg:self-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Pro-Suite 50
            </p>
            <h1 className="mt-4 text-2xl font-semibold">Command dashboard</h1>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Navigate your premium tools, live workflows, and growth systems from one workspace.
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Credit balance
            </p>
            <p className="mt-3 text-4xl font-semibold text-white">{credits}</p>
            <p className="mt-2 text-sm text-cyan-50/80">Available credits for running premium tools.</p>
          </div>

          <nav className="mt-8 space-y-6">
            {dashboardNavigationSections.map((section) => (
              <div key={section.heading}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35">
                  {section.heading}
                </p>
                <div className="mt-3 space-y-2">
                  {section.items.map((item) => {
                    const active = isActive(item.href, currentPath);

                    return (
                      <Link
                        key={`${section.heading}-${item.label}`}
                        href={item.href}
                        className={`block rounded-xl border px-4 py-3 text-sm transition ${
                          active
                            ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-100"
                            : "border-white/8 bg-black/20 text-white/70 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <form action={logout} className="mt-8">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Log out
            </button>
          </form>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  Dashboard overview
                </p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">{description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:min-w-[360px]">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">Current credits</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{credits}</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">Live from your `profiles` table.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">Signed in as</p>
                  <p className="mt-3 text-base font-medium text-white/85">{userName}</p>
                  <p className="mt-2 break-all text-sm leading-6 text-white/55">{userEmail}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
