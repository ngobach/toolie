import { useEffect, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { IMaskInput } from "react-imask";
import { z } from "zod";
import {
  Button,
  FormActions,
  FormField,
  MoneyInputField,
  PageIntro,
  PageLayout,
  ResultBreakdown,
  SegmentedControl,
} from "../../components";
import {
  type GrossToNetSnapshotCalculation,
  useGrossToNetSnapshotStore,
} from "../../stores/useGrossToNetSnapshotStore";

const areaOptions = ["I", "II", "III", "IV"] as const;

const personalDeduction = 15_500_000;
const dependantDeductionPerPerson = 6_200_000;
const socialInsuranceRate = 0.08;
const healthInsuranceRate = 0.015;
const unemploymentInsuranceRate = 0.01;
const socialAndHealthInsuranceCap = 46_800_000;

const regionalMinimumWageByArea = {
  I: 5_310_000,
  II: 4_730_000,
  III: 4_140_000,
  IV: 3_700_000,
} satisfies Record<(typeof areaOptions)[number], number>;

const positiveCurrencyFieldSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .refine((value) => Number(value.replaceAll(",", "")) > 0, {
    message: "Please enter an amount greater than 0",
  });

const nonNegativeCurrencyFieldSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .refine((value) => Number(value.replaceAll(",", "")) >= 0, {
    message: "Please enter an amount of 0 or more",
  });

const dependantsSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .refine(
    (value) =>
      Number.isInteger(Number(value)) &&
      Number(value) >= 0 &&
      Number(value) <= 10,
    {
      message: "Dependants must be between 0 and 10",
    },
  );

const formSchema = z.object({
  area: z.enum(areaOptions, {
    error: "Please select an area",
  }),
  dependants: dependantsSchema,
  fixedSalary: positiveCurrencyFieldSchema,
  monthlyBonusAndTaxableAllowance: nonNegativeCurrencyFieldSchema,
  nonTaxableAllowance: nonNegativeCurrencyFieldSchema,
});

type GrossToNetFormValues = z.infer<typeof formSchema>;

function parseCurrency(value: string) {
  return Number(value.replaceAll(",", ""));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function calculateProgressivePit(monthlyTaxableIncome: number) {
  const brackets = [
    { cap: 10_000_000, rate: 0.05 },
    { cap: 30_000_000, rate: 0.1 },
    { cap: 60_000_000, rate: 0.2 },
    { cap: 100_000_000, rate: 0.3 },
    { cap: Number.POSITIVE_INFINITY, rate: 0.35 },
  ] as const;

  let remaining = monthlyTaxableIncome;
  let previousCap = 0;
  let tax = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) {
      break;
    }

    const taxableSlice = Math.min(remaining, bracket.cap - previousCap);

    if (taxableSlice > 0) {
      tax += taxableSlice * bracket.rate;
      remaining -= taxableSlice;
    }

    previousCap = bracket.cap;
  }

  return Math.round(tax);
}

function calculateGrossToNet(
  values: GrossToNetFormValues,
): GrossToNetSnapshotCalculation {
  const fixedSalary = parseCurrency(values.fixedSalary);
  const monthlyBonusAndTaxableAllowance = parseCurrency(
    values.monthlyBonusAndTaxableAllowance,
  );
  const nonTaxableAllowance = parseCurrency(values.nonTaxableAllowance);
  const dependants = Number(values.dependants);
  const taxableIncomeBeforeDeductions =
    fixedSalary + monthlyBonusAndTaxableAllowance;
  const grossIncome = taxableIncomeBeforeDeductions + nonTaxableAllowance;

  const socialInsuranceBase = Math.min(
    fixedSalary,
    socialAndHealthInsuranceCap,
  );
  const unemploymentInsuranceCap = regionalMinimumWageByArea[values.area] * 20;
  const unemploymentInsuranceBase = Math.min(
    fixedSalary,
    unemploymentInsuranceCap,
  );

  const socialInsurance = Math.round(
    socialInsuranceBase * socialInsuranceRate,
  );
  const healthInsurance = Math.round(
    socialInsuranceBase * healthInsuranceRate,
  );
  const unemploymentInsurance = Math.round(
    unemploymentInsuranceBase * unemploymentInsuranceRate,
  );
  const employeeInsuranceTotal =
    socialInsurance + healthInsurance + unemploymentInsurance;
  const dependantDeduction = dependants * dependantDeductionPerPerson;
  const pitTaxableIncome = Math.max(
    0,
    taxableIncomeBeforeDeductions -
    employeeInsuranceTotal -
    personalDeduction -
    dependantDeduction,
  );
  const pit = calculateProgressivePit(pitTaxableIncome);
  const finalNetIncome = grossIncome - employeeInsuranceTotal - pit;

  return {
    area: values.area,
    dependantDeduction,
    dependants,
    employeeInsuranceTotal,
    finalNetIncome,
    fixedSalary,
    grossIncome,
    healthInsurance,
    monthlyBonusAndTaxableAllowance,
    nonTaxableAllowance,
    personalDeduction,
    pit,
    pitTaxableIncome,
    socialInsurance,
    taxableIncomeBeforeDeductions,
    unemploymentInsurance,
  };
}

function getFieldError(errors: unknown[]) {
  const firstError = errors[0];

  if (typeof firstError === "string") {
    return firstError;
  }

  if (
    firstError &&
    typeof firstError === "object" &&
    "message" in firstError &&
    typeof firstError.message === "string"
  ) {
    return firstError.message;
  }

  return undefined;
}

const areaOptionItems = areaOptions.map((area) => ({
  label: area,
  value: area,
}));

export function GrossToNetPage() {
  const resultSectionRef = useRef<HTMLElement | null>(null);
  const shouldScrollToResultRef = useRef(false);
  const clearSnapshot = useGrossToNetSnapshotStore(
    (state) => state.clearSnapshot,
  );
  const hasHydrated = useGrossToNetSnapshotStore((state) => state.hasHydrated);
  const setSnapshot = useGrossToNetSnapshotStore((state) => state.setSnapshot);
  const snapshot = useGrossToNetSnapshotStore((state) => state.snapshot);
  const form = useForm({
    defaultValues: {
      area: "",
      dependants: "",
      fixedSalary: "",
      monthlyBonusAndTaxableAllowance: "",
      nonTaxableAllowance: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const parsed = formSchema.parse(value);
      const result = calculateGrossToNet(parsed);
      shouldScrollToResultRef.current = true;

      setSnapshot({
        calculation: result,
        submittedAt: new Date().toISOString(),
        values: parsed,
      });
    },
  });

  useEffect(() => {
    if (!hasHydrated || !snapshot) {
      return;
    }

    form.reset(snapshot.values);
  }, [form, hasHydrated, snapshot]);

  const calculation = snapshot?.calculation ?? null;

  useEffect(() => {
    if (!calculation || !shouldScrollToResultRef.current) {
      return;
    }

    resultSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    shouldScrollToResultRef.current = false;
  }, [calculation]);

  return (
    <PageLayout>
      <title>Gross to Net | Toolie</title>
      <div className="py-10">
        <PageIntro
          description="Estimate monthly take-home income from salary, allowances, dependants, and area-based insurance rules."
          eyebrow="Tools"
          title="Gross to Net"
          variant="compact"
        />

        <section className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
          <form
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <form.Field
                  name="fixedSalary"
                  validators={{
                    onBlur: positiveCurrencyFieldSchema,
                  }}
                >
                  {(field) => (
                    <MoneyInputField
                      error={
                        field.state.meta.isTouched
                          ? getFieldError(field.state.meta.errors)
                          : undefined
                      }
                      name="Fixed salary"
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                      placeholder="Enter fixed salary"
                      tooltip="Insurable salary"
                      value={field.state.value}
                    />
                  )}
                </form.Field>
              </div>

              <div className="lg:col-span-1">
                <form.Field
                  name="nonTaxableAllowance"
                  validators={{
                    onBlur: nonNegativeCurrencyFieldSchema,
                  }}
                >
                  {(field) => (
                    <MoneyInputField
                      error={
                        field.state.meta.isTouched
                          ? getFieldError(field.state.meta.errors)
                          : undefined
                      }
                      name="Non-taxable allowance"
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                      placeholder="Enter non-taxable allowance"
                      value={field.state.value}
                    />
                  )}
                </form.Field>
              </div>

              <div className="lg:col-span-1">
                <form.Field
                  name="monthlyBonusAndTaxableAllowance"
                  validators={{
                    onBlur: nonNegativeCurrencyFieldSchema,
                  }}
                >
                  {(field) => (
                    <MoneyInputField
                      error={
                        field.state.meta.isTouched
                          ? getFieldError(field.state.meta.errors)
                          : undefined
                      }
                      name="Monthly bonus & taxable allowance"
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                      placeholder="Enter monthly bonus and taxable allowance"
                      value={field.state.value}
                    />
                  )}
                </form.Field>
              </div>

              <div className="sm:col-span-1 lg:col-span-1">
                <form.Field
                  name="dependants"
                  validators={{
                    onBlur: dependantsSchema,
                  }}
                >
                  {(field) => (
                    <FormField
                      error={
                        field.state.meta.isTouched
                          ? getFieldError(field.state.meta.errors)
                          : undefined
                      }
                      label="Dependants"
                    >
                      <IMaskInput
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-primary-400/40 focus:bg-black/40"
                        inputMode="numeric"
                        mask={Number}
                        name={field.name}
                        onAccept={(value) => field.handleChange(String(value))}
                        onBlur={field.handleBlur}
                        placeholder="Enter number of dependants"
                        radix="."
                        scale={0}
                        thousandsSeparator=""
                        unmask={false}
                        value={field.state.value}
                      />
                    </FormField>
                  )}
                </form.Field>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <form.Field
                  name="area"
                  validators={{
                    onBlur: z.enum(areaOptions, {
                      error: "Please select an area",
                    }),
                  }}
                >
                  {(field) => (
                    <SegmentedControl
                      error={
                        field.state.meta.isTouched
                          ? getFieldError(field.state.meta.errors)
                          : undefined
                      }
                      label="Area"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onValueChange={(value) => field.handleChange(value)}
                      options={areaOptionItems}
                      value={field.state.value}
                    />
                  )}
                </form.Field>
              </div>
            </div>

            <FormActions>
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button
                onClick={() => {
                  form.reset();
                  clearSnapshot();
                }}
                type="button"
                variant="secondary"
              >
                Reset
              </Button>
            </FormActions>
          </form>
        </section>

        {calculation ? (
          <section
            className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8"
            ref={resultSectionRef}
          >
            <div className="flex flex-col gap-2 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-300">
                  Result
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {formatCurrency(calculation.finalNetIncome)} VND
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Estimated monthly net income after employee insurance and PIT.
                </p>
              </div>
              <p className="text-sm text-slate-400">
                Area {calculation.area} · {calculation.dependants} dependant
                {calculation.dependants === 1 ? "" : "s"}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ResultBreakdown.Card title="Income">
                <ResultBreakdown.Item
                  label="Fixed salary"
                  value={`${formatCurrency(calculation.fixedSalary)} VND`}
                />
                <ResultBreakdown.Item
                  label="Bonus & taxable allowance"
                  value={`${formatCurrency(
                    calculation.monthlyBonusAndTaxableAllowance,
                  )} VND`}
                />
                <ResultBreakdown.Item
                  label="Non-taxable allowance"
                  value={`${formatCurrency(calculation.nonTaxableAllowance)} VND`}
                />
                <ResultBreakdown.Item variant="divider" />
                <ResultBreakdown.Item
                  label="Gross income"
                  value={`${formatCurrency(calculation.grossIncome)} VND`}
                  variant="pair-strong"
                />
              </ResultBreakdown.Card>

              <ResultBreakdown.Card title="Deductions">
                <ResultBreakdown.Item
                  label="Social insurance"
                  value={`${formatCurrency(calculation.socialInsurance)} VND`}
                />
                <ResultBreakdown.Item
                  label="Health insurance"
                  value={`${formatCurrency(calculation.healthInsurance)} VND`}
                />
                <ResultBreakdown.Item
                  label="Unemployment insurance"
                  value={`${formatCurrency(
                    calculation.unemploymentInsurance,
                  )} VND`}
                />
                <ResultBreakdown.Item
                  label="PIT taxable income"
                  value={`${formatCurrency(calculation.pitTaxableIncome)} VND`}
                />
                <ResultBreakdown.Item
                  label="Personal deduction"
                  value={`${formatCurrency(calculation.personalDeduction)} VND`}
                />
                <ResultBreakdown.Item
                  label="Dependant deduction"
                  value={`${formatCurrency(calculation.dependantDeduction)} VND`}
                />
                <ResultBreakdown.Item
                  label="PIT"
                  value={`${formatCurrency(calculation.pit)} VND`}
                />
                <ResultBreakdown.Item variant="divider" />
                <ResultBreakdown.Item
                  label="Total insurance"
                  value={`${formatCurrency(
                    calculation.employeeInsuranceTotal,
                  )} VND`}
                  variant="pair-strong"
                />
              </ResultBreakdown.Card>
            </div>
          </section>
        ) : null}
      </div>
    </PageLayout>
  );
}
