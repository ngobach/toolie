import type { ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FieldErrorText } from "../FieldErrorText";

export type FormFieldProps = {
  children: ReactNode;
  error?: string;
  label: string;
  tooltip?: string;
};

export function FormField({ children, error, label, tooltip }: FormFieldProps) {
  return (
    <label className="block">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        {tooltip ? (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                aria-label={tooltip}
                className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/12 text-[10px] font-semibold text-slate-400 outline-none hover:border-primary-300/30 hover:text-white focus-visible:border-primary-300/40 focus-visible:text-white"
                type="button"
              >
                i
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 max-w-56 rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-xs leading-5 text-slate-200 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                side="top"
                sideOffset={8}
              >
                {tooltip}
                <Tooltip.Arrow className="fill-slate-950" height={6} width={10} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ) : null}
      </div>
      {children}
      <FieldErrorText message={error} />
    </label>
  );
}
