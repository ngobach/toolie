import type { ReactNode } from "react";

export type UtilityCardProps = {
  description: string;
  icon: ReactNode;
  meta: string;
  title: string;
};

export function UtilityCard({
  description,
  icon,
  meta,
  title,
}: UtilityCardProps) {
  return (
    <article className="group rounded-xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-white/16 hover:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary-400/20 bg-primary-500/10 text-primary-100">
          {icon}
        </div>
        <span className="text-xs text-slate-500">{meta}</span>
      </div>
      <h2 className="mt-5 text-lg font-medium text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-5 text-sm font-medium text-primary-200 transition group-hover:text-white">
        Open utility
      </div>
    </article>
  );
}
