export type PageIntroProps = {
  description: string;
  eyebrow: string;
  title: string;
  variant?: "default" | "compact";
};

export function PageIntro({
  description,
  eyebrow,
  title,
  variant = "default",
}: PageIntroProps) {
  const isCompact = variant === "compact";

  return (
    <section
      className={`rounded-2xl border border-white/8 bg-white/[0.02] ${isCompact ? "p-6 sm:p-7" : "p-8 sm:p-10"}`}
    >
      {isCompact ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-200">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
          </div>
          <div className="lg:pt-1 lg:text-right">
            <p className="text-sm leading-6 text-slate-400">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-200">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
            {description}
          </p>
        </>
      )}
    </section>
  );
}
