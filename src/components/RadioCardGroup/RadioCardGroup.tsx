import * as RadioGroup from "@radix-ui/react-radio-group";
import { FieldErrorText } from "../FieldErrorText";

export type RadioCardGroupOption = {
  label: string;
  value: string;
};

export type RadioCardGroupProps = {
  error?: string;
  label: string;
  name: string;
  onBlur: () => void;
  onValueChange: (value: string) => void;
  options: RadioCardGroupOption[];
  value: string;
};

export function RadioCardGroup({
  error,
  label,
  name,
  onBlur,
  onValueChange,
  options,
  value,
}: RadioCardGroupProps) {
  return (
    <fieldset className="block">
      <legend className="text-sm font-medium text-slate-200">{label}</legend>
      <RadioGroup.Root
        className="mt-3 flex flex-wrap gap-3"
        name={name}
        onValueChange={onValueChange}
        value={value}
      >
        {options.map((option) => {
          const checked = value === option.value;

          return (
            <RadioGroup.Item
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                checked
                  ? "border-primary-400/40 bg-primary-500/12 text-white"
                  : "border-white/10 bg-black/25 text-slate-300 hover:border-white/16 hover:bg-white/[0.04]"
              }`}
              key={option.value}
              onBlur={onBlur}
              value={option.value}
            >
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-current" />
              <span>{option.label}</span>
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
      <FieldErrorText message={error} />
    </fieldset>
  );
}
