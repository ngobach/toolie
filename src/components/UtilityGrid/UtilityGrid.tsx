import { UtilityCard, type UtilityCardProps } from "../UtilityCard";

export type UtilityGridProps = {
  items: UtilityCardProps[];
  title: string;
};

export function UtilityGrid({ items, title }: UtilityGridProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-sm text-slate-500">
            Core workflows laid out as clean entry points.
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
          {items.length} utilities
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <UtilityCard
            description={item.description}
            key={item.title}
            meta={item.meta}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}
