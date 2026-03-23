import type { ReactNode } from "react";

type ResultBreakdownCardProps = {
  children: ReactNode;
  title: string;
};

type ResultBreakdownItemProps =
  | {
      label?: never;
      value?: never;
      variant: "divider";
    }
  | {
      label: string;
      value: ReactNode;
      variant?: "pair" | "pair-strong";
    };

function ResultBreakdownCard({
  children,
  title,
}: ResultBreakdownCardProps) {
  return (
    <div className="space-y-3 rounded-xl border border-white/8 bg-black/20 p-4">
      <p className="text-sm font-medium text-white">{title}</p>
      {children}
    </div>
  );
}

function ResultBreakdownItem(props: ResultBreakdownItemProps) {
  if (props.variant === "divider") {
    return <div className="border-t border-white/8" />;
  }

  const isStrong = props.variant === "pair-strong";

  return (
    <div
      className={`flex items-center justify-between text-sm ${
        isStrong ? "font-medium text-white" : "text-slate-300"
      }`}
    >
      <span>{props.label}</span>
      <span>{props.value}</span>
    </div>
  );
}

export const ResultBreakdown = Object.assign(
  function ResultBreakdown() {
    return null;
  },
  {
    Card: ResultBreakdownCard,
    Item: ResultBreakdownItem,
  },
);
