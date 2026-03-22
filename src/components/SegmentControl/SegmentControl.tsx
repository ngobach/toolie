import * as RadioGroup from "@radix-ui/react-radio-group";
import { FieldErrorText } from "../FieldErrorText";

export type SegmentControlOption = {
  label: string;
  value: string;
};

export type SegmentControlProps = {
  error?: string;
  label: string;
  name: string;
  onBlur: () => void;
  onValueChange: (value: string) => void;
  options: SegmentControlOption[];
  value: string;
};

export function SegmentControl({
  error,
  label,
  name,
  onBlur,
  onValueChange,
  options,
  value,
}: SegmentControlProps) {
  return (
    <fieldset className="block">
      <legend className="text-sm font-medium text-slate-200">{label}</legend>
      <RadioGroup.Root
        className="mt-3 inline-flex w-full flex-wrap gap-2"
        name={name}
        onValueChange={onValueChange}
        value={value}
      >
        {options.map((option) => {
          const checked = value === option.value;

          return (
            <RadioGroup.Item
              className={`inline-flex min-w-[52px] flex-1 items-center justify-center rounded-md border px-4 py-2.5 text-sm font-medium outline-none ${
                checked
                  ? "border-primary-300/40 bg-primary-500 text-white"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
              }`}
              key={option.value}
              onBlur={onBlur}
              value={option.value}
            >
              {option.label}
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
      <FieldErrorText message={error} />
    </fieldset>
  );
}
