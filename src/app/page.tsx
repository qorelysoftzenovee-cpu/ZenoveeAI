import Link from "next/link";

const categories = [
  {
    title: "Marketing",
    description:
      "Launch outreach, SEO systems, ad experimentation, and content engines with premium AI execution support.",
  },
  {
    title: "Legal",
    description:
      "Review agreements, map obligations, audit policy language, and structure compliance intelligence with clarity.",
  },
  {
    title: "Finance",
    description:
      "Model unit economics, scenario plan runway, analyze valuation pressure, and generate decision-ready finance briefs.",
  },
  {
    title: "Sales",
    description:
      "Equip revenue teams with objection handling, account strategy, qualification systems, and structured deal support.",
  },
  {
    title: "Technical Data",
    description:
      "Process logs, transform schemas, diagram systems, and accelerate technical operations with precision tooling.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Pro-Suite 50
            </p>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/login" className="transition hover:text-white">
              Login
            </Link>
            <Link href="/signup" className="transition hover:text-white">
              Signup
            </Link>
          </nav>
        </header>

        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-100">
              Enterprise-grade workflow infrastructure for modern B2B operators
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                  Pro-Suite 50:
                  <span className="mt-3 block bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                    The Ultimate B2B Multi-Tool Platform.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Unify marketing, legal, finance, sales, and technical execution inside a refined multi-tool operating layer built for speed, leverage, and premium internal workflows.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-violet-100"
                  >
                    Get Started for Free
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    Launch Workspace Preview
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    label: "50 Tools",
                    text: "Structured around the complete cross-functional enterprise blueprint.",
                  },
                  {
                    label: "Live Credits",
                    text: "Usage-aware tool execution with wallet-based control and premium monetization.",
                  },
                  {
                    label: "One Platform",
                    text: "Designed for operators who want one command system instead of scattered apps.",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{stat.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-violet-500/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#08101f] p-6">
                <p className="text-sm text-slate-400">Operating framework preview</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Five professional domains</h2>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {categories.map((category, index) => (
                    <div
                      key={category.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80">
                        Category {index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {category.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Core Domains
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Designed to handle the full professional operating stack.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <article
                key={category.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
