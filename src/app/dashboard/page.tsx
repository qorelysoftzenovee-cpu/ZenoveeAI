import Link from "next/link";

import { dashboardToolCards } from "@/lib/dashboard";

export default function DashboardPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Tool library
          </p>
          <h3 className="mt-3 text-2xl font-semibold">Featured tools for your first release</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            These cards now include live routing for both core tools while keeping room for the rest of your expanding premium suite.
          </p>
        </div>
        <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
          {dashboardToolCards.length} tools prepared
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {dashboardToolCards.map((tool) => (
                <article
                  key={tool.name}
                  className="group rounded-[1.75rem] border border-white/10 bg-[#08101f] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-2xl hover:shadow-cyan-950/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                        {tool.category}
                      </p>
                      <h4 className="mt-3 text-xl font-semibold text-white">{tool.name}</h4>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">
                      Cost: {tool.cost} Credits
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/65">{tool.description}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm text-white/45">
                      {tool.live ? "Live tool" : "Placeholder module"}
                    </span>
                    {tool.live ? (
                      <Link
                        href={tool.href}
                        className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                      >
                        Open tool
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                      >
                        Coming soon
                      </button>
                    )}
                  </div>
                </article>
        ))}
      </div>
    </section>
  );
}
