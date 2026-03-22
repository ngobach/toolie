const features = [
  "React 19 with a standard src/ entrypoint",
  "Vite 8 dev and build workflow",
  "UnoCSS utilities with a shared config",
  "TypeScript configured for browser-based SPA work",
];

export default function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#f8fafc_45%,_#e2e8f0)] px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="panel-card overflow-hidden">
          <div className="grid gap-8 p-8 md:grid-cols-[1.5fr_1fr] md:p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 ring-1 ring-brand-100">
                Bun + Vite + React + UnoCSS
              </div>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  A clean starting point for your next SPA.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                  This project is ready for component work, client-side routing,
                  API integration, and design system growth without carrying the
                  noise of a larger template.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  href="https://vite.dev"
                  rel="noreferrer"
                  target="_blank"
                >
                  Explore Vite
                </a>
                <a
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
                  href="https://unocss.dev"
                  rel="noreferrer"
                  target="_blank"
                >
                  Explore UnoCSS
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-6 text-sm text-slate-200 shadow-2xl shadow-slate-900/15">
              <p className="font-medium text-white">Quick start</p>
              <div className="mt-4 space-y-3 font-mono text-[13px] leading-6">
                <p>$ bun run dev</p>
                <p>$ bun run build</p>
                <p>$ bun run preview</p>
              </div>
              <p className="mt-6 text-slate-400">
                Edit <code>src/App.tsx</code> to begin shaping the UI.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article className="panel-card p-5" key={feature}>
              <div className="mb-4 h-11 w-11 rounded-2xl bg-brand-50 ring-1 ring-brand-100" />
              <h2 className="text-base font-semibold text-slate-950">
                {feature}
              </h2>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
