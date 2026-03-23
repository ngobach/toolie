import { IMaskInput } from "react-imask";
import { FormField } from "../FormField";

export type MoneyInputFieldProps = {
  error?: string;
  name: string;
  onBlur: () => void;
  onValueChange: (value: string) => void;
  placeholder: string;
  tooltip?: string;
  value: string;
};

export function MoneyInputField({
  error,
  name,
  onBlur,
  onValueChange,
  placeholder,
  tooltip,
  value,
}: MoneyInputFieldProps) {
  return (
    <FormField error={error} label={name} tooltip={tooltip}>
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 focus-within:border-primary-400/40 focus-within:bg-black/40">
        <IMaskInput
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          inputMode="numeric"
          mask={Number}
          name={name}
          onAccept={(nextValue) => onValueChange(String(nextValue))}
          onBlur={onBlur}
          placeholder={placeholder}
          radix="."
          scale={0}
          thousandsSeparator=","
          unmask={false}
          value={value}
        />
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          VND
        </span>
      </div>
    </FormField>
  );
}
