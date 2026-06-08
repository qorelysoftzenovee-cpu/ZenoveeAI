export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.32),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_24%),linear-gradient(180deg,#081120_0%,#050816_55%,#04050d_100%)]" />
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
          <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Pro-Suite 50
              </p>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#benefits" className="transition hover:text-white">
                Benefits
              </a>
              <a href="/login" className="transition hover:text-white">
                Login
              </a>
              <a href="/signup" className="transition hover:text-white">
                Signup
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
                Built for premium B2B operations, automation, and growth
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Pro-Suite 50
                <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
                  The executive toolkit for modern businesses.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                Launch a polished multi-tool platform for teams that need dashboards,
                workflow utilities, client intelligence, and real-time collaboration in
                one premium experience.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-100"
                >
                  Request a demo
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Explore features
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  ["50+", "high-value business tools"],
                  ["24/7", "team-wide accessibility"],
                  ["1 hub", "for sales, ops, and reporting"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#08101f] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/50">Platform overview</p>
                      <h2 className="mt-2 text-2xl font-semibold">Command center</h2>
                    </div>
                    <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Live
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      "Analytics & executive reporting",
                      "Proposal, CRM, and client workflow tools",
                      "Secure team access powered by Supabase",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-4"
                      >
                        <div className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                        <p className="text-sm text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                      <p className="text-sm text-white/50">Productivity lift</p>
                      <p className="mt-3 text-3xl font-semibold">+38%</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                      <p className="text-sm text-white/50">Admin time saved</p>
                      <p className="mt-3 text-3xl font-semibold">12 hrs/wk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Features
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              A clean foundation for your premium B2B platform.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Multi-tool dashboard",
                text: "Present multiple high-value tools inside one consistent, premium workspace.",
              },
              {
                title: "Secure authentication",
                text: "Prepare for Supabase sign-in, role-based access, and protected team areas.",
              },
              {
                title: "Modern UI system",
                text: "Use polished cards, strong hierarchy, and responsive layouts across the product.",
              },
              {
                title: "Growth-ready structure",
                text: "Start with a landing page that can expand into portals, tools, and client dashboards.",
              },
            ].map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Why it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Designed to feel trusted, capable, and enterprise-ready from day one.
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              "A premium first impression for investors, clients, and business users",
              "Flexible layout sections you can later connect to real tools and dashboards",
              "Simple enough for a beginner to grow, but polished enough to feel professional",
            ].map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-violet-400/10 p-8 text-center backdrop-blur sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Next step
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Start building your B2B platform with confidence.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            This template gives you a strong first screen for Pro-Suite 50 and a clean
            base for adding authentication, data, and business tools later.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@prosuite50.com"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            >
              hello@prosuite50.com
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Book strategy call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
