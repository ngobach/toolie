export type ActivityPanelProps = {
  description?: string;
  items: string[];
  title: string;
};

export function ActivityPanel({
  description,
  items,
  title,
}: ActivityPanelProps) {
  return (
    <section className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            className="border-b border-white/6 pb-4 last:border-b-0 last:pb-0"
            key={item}
          >
            <p className="text-sm leading-6 text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
