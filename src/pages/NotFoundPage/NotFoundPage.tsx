import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="min-h-screen px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col">
        <main className="flex flex-1 items-center justify-center">
          <section className="w-full max-w-2xl rounded-2xl border border-white/8 bg-white/[0.02] p-8 text-center sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-200">
              404
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              This page could not be found.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
              The route may have moved, the link may be outdated, or the page
              might not exist yet in this portal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                className="rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-slate-200"
                to="/"
              >
                Back to home
              </Link>
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
