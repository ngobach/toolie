import type { ReactNode } from "react";
import { FieldErrorText } from "../FieldErrorText";

export type FormFieldProps = {
  children: ReactNode;
  error?: string;
  label: string;
};

export function FormField({ children, error, label }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
      <FieldErrorText message={error} />
    </label>
  );
}
