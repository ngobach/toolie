type HeroAction = {
  label: string;
  variant?: "primary" | "secondary";
};

export type HeroSectionProps = {
  description: string;
  eyebrow: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  title: string;
};

function HeroActionButton({
  action,
  isPrimary,
}: {
  action: HeroAction;
  isPrimary: boolean;
}) {
  const className = isPrimary
    ? "rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-slate-200"
    : "rounded-md border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/6";

  return (
    <button className={className} type="button">
      {action.label}
    </button>
  );
}

export function HeroSection({
  description,
  eyebrow,
  primaryAction,
  secondaryAction,
  title,
}: HeroSectionProps) {
  return (
    <div>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-400/20 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-200">
        {eyebrow}
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <HeroActionButton action={primaryAction} isPrimary />
        {secondaryAction ? (
          <HeroActionButton action={secondaryAction} isPrimary={false} />
        ) : null}
      </div>
    </div>
  );
}
