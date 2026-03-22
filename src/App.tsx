const navItems = ["Dashboard", "Tools", "Activity", "Teams"];

const utilityCards = [
  {
    title: "Workspace Generator",
    description:
      "Spin up new project spaces with shared presets, ownership tags, and deployment metadata.",
    status: "Active",
  },
  {
    title: "Asset Optimizer",
    description:
      "Batch compress images, rename uploads, and prep delivery bundles for product teams.",
    status: "Queued",
  },
  {
    title: "Billing Console",
    description:
      "Preview invoice runs, monitor payment retries, and issue manual adjustments without leaving the portal.",
    status: "Healthy",
  },
];

const quickStats = [
  { label: "Utility Runs", value: "12.4k", change: "+8.2%" },
  { label: "Active Spaces", value: "318", change: "+14 new" },
  { label: "Support Queue", value: "09", change: "-3 today" },
];

const feedItems = [
  "Data export completed for Northwind Ops.",
  "Storage cleanup rule updated by Platform team.",
  "Billing retry recovered 14 subscriptions.",
];

export default function App() {
  return (
    <div className="min-h-screen px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col gap-6">
        <header className="panel-card soft-ring sticky top-4 z-10 overflow-hidden">
          <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-900 text-sm font-semibold tracking-[0.24em] text-white shadow-lg shadow-primary-900/20">
                TU
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">
                  Toolie Portal
                </p>
                <p className="text-lg font-semibold text-white">
                  Utilities Hub
                </p>
              </div>
            </div>
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <a
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-primary-500/14 hover:text-primary-200"
                  href="/"
                  key={item}
                >
                  {item}
                </a>
              ))}
              <button className="ml-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-500">
                Open Console
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
            <section className="panel-card soft-ring overflow-hidden">
              <div className="border-b border-white/8 px-6 py-6 sm:px-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-primary-500/12 px-3 py-1 text-sm font-medium text-primary-200 ring-1 ring-primary-400/18">
                  Internal utilities portal mockup
                </div>
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                  <div className="space-y-4">
                    <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                      One place to launch the tools your team uses every day.
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-slate-400">
                      This mockup frames the product as an internal portal with
                      quick access to operational utilities, service health, and
                      recent activity across teams.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button className="rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-900/18 transition hover:bg-primary-700">
                        Launch Utilities
                      </button>
                      <button className="rounded-lg bg-white/6 px-5 py-3 text-sm font-semibold text-slate-200 ring-1 ring-white/10 transition hover:bg-white/10">
                        View Activity Feed
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-black/40 p-5 text-slate-200 shadow-2xl shadow-black/30">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">
                        System snapshot
                      </p>
                      <span className="rounded-lg bg-emerald-400/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
                        All systems normal
                      </span>
                    </div>
                    <div className="mt-5 space-y-4 text-sm">
                      {quickStats.map((stat) => (
                        <div
                          className="flex items-end justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                          key={stat.label}
                        >
                          <div>
                            <p className="text-slate-500">{stat.label}</p>
                            <p className="mt-1 text-2xl font-semibold text-white">
                              {stat.value}
                            </p>
                          </div>
                          <span className="text-primary-300">{stat.change}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-6 py-6 sm:px-8 xl:grid-cols-3">
                {utilityCards.map((card) => (
                  <article className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10" key={card.title}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-500/30 via-primary-400/12 to-white/8 ring-1 ring-primary-400/18" />
                      <span className="rounded-lg bg-primary-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-200">
                        {card.status}
                      </span>
                    </div>
                    <h2 className="mt-5 text-lg font-semibold text-white">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {card.description}
                    </p>
                    <button className="mt-5 text-sm font-semibold text-primary-300 transition hover:text-primary-100">
                      Open utility
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <article className="panel-card soft-ring p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Quick actions
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Frequent tasks for operators and support teams.
                    </p>
                  </div>
                  <span className="rounded-lg bg-primary-500/12 px-3 py-1 text-xs font-medium text-primary-200">
                    6 saved
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  {["Create workspace", "Run cleanup", "Export usage log", "Invite teammate"].map(
                    (action) => (
                      <button
                        className="flex items-center justify-between rounded-xl bg-primary-500/10 px-4 py-4 text-left text-sm font-medium text-slate-200 ring-1 ring-primary-400/16 transition hover:bg-primary-500/16"
                        key={action}
                      >
                        {action}
                        <span className="text-primary-300">Open</span>
                      </button>
                    ),
                  )}
                </div>
              </article>

              <article className="panel-card soft-ring p-6">
                <p className="text-sm font-semibold text-white">
                  Recent activity
                </p>
                <div className="mt-5 space-y-4">
                  {feedItems.map((item) => (
                    <div className="flex gap-3" key={item}>
                      <div className="mt-1 h-2.5 w-2.5 rounded-sm bg-primary-500" />
                      <p className="text-sm leading-6 text-slate-400">{item}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-800 to-black p-6 text-white shadow-2xl shadow-primary-900/18">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-200">
                  Need a new tool?
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Turn repeated manual work into a portal utility.
                </h2>
                <p className="mt-3 text-sm leading-6 text-primary-100/90">
                  Draft intake requirements, align ownership, and queue a build
                  request for the platform team directly from this space.
                </p>
                <button className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary-800 transition hover:bg-primary-50">
                  Submit request
                </button>
              </article>
            </section>
          </div>
        </main>

        <footer className="px-1 pb-2 pt-1 text-center text-sm text-slate-500">
          <p>© 2026 Toolie. Built for internal operations and shared utilities.</p>
        </footer>
      </div>
    </div>
  );
}
