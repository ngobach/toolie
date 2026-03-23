import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "large";

export type ButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClassName =
  "inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-sm font-medium";

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "border-primary-700/50 bg-gradient-to-b from-primary-900/30 to-primary-900/0 text-white font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-primary-600/50 hover:from-primary-900/40 hover:to-primary-900/20",
  secondary:
    "border-white/10 bg-white/[0.03] text-slate-200 transition hover:bg-white/[0.06]",
};

const sizeClassNames: Record<ButtonSize, string> = {
  default: "",
  large: "px-5 py-3",
};

export function Button({
  children,
  className,
  size = "default",
  variant = "primary",
  ...props
}: ButtonProps) {
  const resolvedClassName = [
    baseClassName,
    variantClassNames[variant],
    sizeClassNames[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={resolvedClassName} {...props}>
      {children}
    </button>
  );
}
