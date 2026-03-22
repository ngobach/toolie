import type { ReactNode } from "react";

export type FormActionsProps = {
  children: ReactNode;
};

export function FormActions({ children }: FormActionsProps) {
  return <div className="flex flex-wrap gap-3 pt-2">{children}</div>;
}
