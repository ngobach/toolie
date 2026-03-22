import { Link } from "react-router-dom";
import { PageLayout } from "../../components";

export function NotFoundPage() {
  return (
    <PageLayout>
      <div className="flex min-h-full items-center justify-center py-10">
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
      </div>
    </PageLayout>
  );
}
