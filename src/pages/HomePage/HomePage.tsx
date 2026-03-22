import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = ["Products", "Developers", "Resources", "Enterprise"];

const utilityCards = [
  {
    title: "Deploy Workspaces",
    description:
      "Create project environments with shared defaults, ownership rules, and deployment-ready metadata.",
    meta: "128 active setups",
  },
  {
    title: "Inspect Usage",
    description:
      "Review operational load, export audit trails, and monitor usage spikes from a single stream.",
    meta: "Realtime insights",
  },
  {
    title: "Automate Cleanup",
    description:
      "Run storage cleanup, retention policies, and recurring housekeeping without manual intervention.",
    meta: "9 queued runs",
  },
  {
    title: "Manage Billing",
    description:
      "Preview invoice cycles, retry failed collections, and issue adjustments for internal service teams.",
    meta: "Healthy status",
  },
];

const highlights = [
  { label: "Monthly runs", value: "12.4k" },
  { label: "Portal users", value: "318" },
  { label: "Response SLA", value: "99.98%" },
];

const activity = [
  "Workspace deployment completed for Northwind Ops.",
  "New retention rule published by the platform team.",
  "Billing reconciliation recovered 14 subscriptions.",
];

const actions = [
  "Create new workspace",
  "Launch cleanup workflow",
  "Export operations report",
];

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col">
        <header className="sticky top-4 z-10 rounded-2xl border border-white/8 bg-black/55 backdrop-blur-xl">
          <div className="px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white text-xs font-semibold tracking-[0.24em] text-black">
                  TU
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-white">Toolie</p>
                  <span className="hidden text-xs text-slate-500 sm:inline">
                    Utilities Portal
                  </span>
                </div>
              </div>

              <div className="hidden items-center gap-1 lg:flex">
                <nav aria-label="Primary" className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      className="rounded-md px-3 py-2 text-sm text-slate-400 transition hover:bg-white/6 hover:text-white"
                      key={item}
                      to="/"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>
                <button className="ml-1 rounded-md border border-white/10 bg-white px-3.5 py-2 text-sm font-medium text-black transition hover:bg-slate-200">
                  Open Portal
                </button>
              </div>

              <button
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/4 text-slate-200 transition hover:bg-white/8 lg:hidden"
                onClick={() => setIsMenuOpen((value) => !value)}
                type="button"
              >
                <span className="relative h-4 w-4">
                  <span
                    className={`absolute left-0 top-1/2 h-px w-4 -translate-y-[5px] bg-current transition duration-200 ${isMenuOpen ? "translate-y-0 rotate-45" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current transition duration-200 ${isMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-px w-4 translate-y-[5px] bg-current transition duration-200 ${isMenuOpen ? "translate-y-0 -rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>

            <div
              aria-hidden={!isMenuOpen}
              className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${isMenuOpen ? "mt-4 max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
              id="mobile-menu"
            >
              <div
                className={`border-t border-white/8 pt-4 transition-transform duration-300 ease-out ${isMenuOpen ? "translate-y-0" : "-translate-y-2"}`}
              >
                <nav aria-label="Mobile primary" className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      className="rounded-md px-3 py-3 text-sm text-slate-300 transition hover:bg-white/6 hover:text-white"
                      key={item}
                      onClick={() => setIsMenuOpen(false)}
                      to="/"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>
                <button className="mt-3 w-full rounded-md border border-white/10 bg-white px-3.5 py-3 text-sm font-medium text-black transition hover:bg-slate-200">
                  Open Portal
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-10">
          <section className="grid gap-10 border-b border-white/8 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-400/20 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-200">
                Built for internal platform teams
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                A calmer, faster place to run the utilities your team depends on.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                A Vercel-inspired portal concept with restrained surfaces,
                editorial spacing, and clear pathways into deployments,
                operations, and automation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-slate-200">
                  Start with deployments
                </button>
                <button className="rounded-md border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/6">
                  View recent activity
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <article
                  className="rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4"
                  key={item.label}
                >
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    Operational toolkit
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Core workflows laid out as clean entry points.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                  4 utilities
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {utilityCards.map((card) => (
                  <article
                    className="group rounded-xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-white/16 hover:bg-white/[0.04]"
                    key={card.title}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-9 w-9 rounded-lg border border-primary-400/20 bg-primary-500/10" />
                      <span className="text-xs text-slate-500">{card.meta}</span>
                    </div>
                    <h2 className="mt-5 text-lg font-medium text-white">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {card.description}
                    </p>
                    <div className="mt-5 text-sm font-medium text-primary-200 transition group-hover:text-white">
                      Open utility
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <section className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Latest activity
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Changes across the portal in the last 24 hours.
                    </p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="mt-6 space-y-4">
                  {activity.map((item) => (
                    <div
                      className="border-b border-white/6 pb-4 last:border-b-0 last:pb-0"
                      key={item}
                    >
                      <p className="text-sm leading-6 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-6">
                <p className="text-sm font-medium text-white">Quick actions</p>
                <div className="mt-5 grid gap-3">
                  {actions.map((action) => (
                    <button
                      className="flex items-center justify-between rounded-lg border border-white/8 bg-black/30 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-primary-400/24 hover:text-white"
                      key={action}
                    >
                      {action}
                      <span className="text-primary-200">Run</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-primary-400/18 bg-primary-500/8 p-6">
                <p className="text-sm font-medium text-primary-200">
                  Build the next utility
                </p>
                <p className="mt-3 text-2xl font-medium text-white">
                  Turn repeated manual work into a reliable internal workflow.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Draft requirements, assign ownership, and move directly into a
                  scoped implementation request.
                </p>
                <button className="mt-6 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-slate-200">
                  Submit request
                </button>
              </section>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/8 py-6 text-center text-sm text-slate-500">
          <p>© 2026 Toolie. Built for internal operations and shared utilities.</p>
        </footer>
      </div>
    </div>
  );
}
