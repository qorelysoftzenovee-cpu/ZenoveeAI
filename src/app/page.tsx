import Link from "next/link";

const categories = [
  {
    title: "Marketing",
    description:
      "Launch outbound campaigns, content engines, ad systems, and SEO operations with AI-backed execution layers.",
  },
  {
    title: "Legal",
    description:
      "Review contracts, map obligations, strengthen policy clarity, and analyze compliance risk with structured outputs.",
  },
  {
    title: "Finance",
    description:
      "Model unit economics, simulate runway scenarios, analyze valuation sensitivity, and structure financial planning briefs.",
  },
  {
    title: "Sales",
    description:
      "Equip account teams with objection handling, qualification logic, discovery plans, and enterprise deal strategy tools.",
  },
  {
    title: "Technical Data",
    description:
      "Process logs, transform JSON, generate regex, diagram systems, and accelerate engineering workflows with precision.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.16),transparent_24%),linear-gradient(180deg,#07101d_0%,#050816_55%,#03040b_100%)]" />

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

        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
              Premium automation, analytics, operations, and execution for modern B2B teams
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Pro-Suite 50:
              <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
                The Ultimate B2B Multi-Tool Platform.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              Centralize your most important commercial, compliance, financial, and technical workflows inside one elegant command system designed for speed, leverage, and scale.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                Get Started for Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Access Existing Workspace
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#08101f] p-6">
                <p className="text-sm text-white/45">Platform preview</p>
                <h2 className="mt-3 text-2xl font-semibold">Five professional domains</h2>

                <div className="mt-8 grid gap-4">
                  {categories.map((category, index) => (
                    <div
                      key={category.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
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
              Platform Scope
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Built to support a full enterprise-grade workflow layer.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <article
                key={category.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
