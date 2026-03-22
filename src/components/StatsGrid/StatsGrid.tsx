export type StatsGridItem = {
  label: string;
  value: string;
};

export type StatsGridProps = {
  items: StatsGridItem[];
};

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
      {items.map((item) => (
        <article
          className="rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4"
          key={item.label}
        >
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
        </article>
      ))}
    </div>
  );
}
