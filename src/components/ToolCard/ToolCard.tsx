import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export type ToolCardProps = {
  description: string;
  icon: ReactNode;
  title: string;
  to: string;
};

export function ToolCard({ description, icon, title, to }: ToolCardProps) {
  return (
    <Link
      className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition hover:border-white/16 hover:bg-white/[0.04]"
      to={to}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary-400/20 bg-primary-500/10 text-primary-100">
          {icon}
        </div>
        <span className="text-sm text-slate-500 transition group-hover:text-primary-200">
          Open
        </span>
      </div>

      <h2 className="mt-5 text-xl font-medium text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </Link>
  );
}
