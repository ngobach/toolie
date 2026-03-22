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
    "border-primary-300/40 bg-gradient-to-b from-primary-400 to-primary-600 font-semibold text-white shadow-[0_10px_30px_rgba(79,70,229,0.28)] hover:border-primary-200/70 hover:from-primary-300 hover:to-primary-500",
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
