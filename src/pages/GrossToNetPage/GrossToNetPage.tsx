import { useState } from "react";
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
  SegmentedControl,
} from "../../components";

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

type GrossToNetCalculation = {
  area: (typeof areaOptions)[number];
  dependantDeduction: number;
  dependants: number;
  employeeInsuranceTotal: number;
  finalNetIncome: number;
  fixedSalary: number;
  grossIncome: number;
  healthInsurance: number;
  monthlyBonusAndTaxableAllowance: number;
  nonTaxableAllowance: number;
  personalDeduction: number;
  pit: number;
  pitTaxableIncome: number;
  socialInsurance: number;
  taxableIncomeBeforeDeductions: number;
  unemploymentInsurance: number;
};

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

function calculateGrossToNet(values: GrossToNetFormValues): GrossToNetCalculation {
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
  const [calculation, setCalculation] = useState<GrossToNetCalculation | null>(
    null,
  );
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

      setCalculation(result);

      console.log("gross-to-net form submitted", result);
    },
  });

  return (
    <PageLayout>
      <title>Gross to Net | Toolie</title>
      <div className="py-10">
        <PageIntro
          description="This is a blank placeholder page for the future Gross to Net tool."
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
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
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

              <div className="space-y-6">
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
                      onValueChange={(value) =>
                        field.handleChange(value)
                      }
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
                  setCalculation(null);
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
          <section className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
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
              <div className="space-y-3 rounded-xl border border-white/8 bg-black/20 p-4">
                <p className="text-sm font-medium text-white">Income</p>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Fixed salary</span>
                  <span>{formatCurrency(calculation.fixedSalary)} VND</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Bonus & taxable allowance</span>
                  <span>
                    {formatCurrency(
                      calculation.monthlyBonusAndTaxableAllowance,
                    )}{" "}
                    VND
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Non-taxable allowance</span>
                  <span>
                    {formatCurrency(calculation.nonTaxableAllowance)} VND
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-white/8 pt-3 text-sm font-medium text-white">
                  <span>Gross income</span>
                  <span>{formatCurrency(calculation.grossIncome)} VND</span>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-white/8 bg-black/20 p-4">
                <p className="text-sm font-medium text-white">Deductions</p>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Social insurance</span>
                  <span>{formatCurrency(calculation.socialInsurance)} VND</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Health insurance</span>
                  <span>{formatCurrency(calculation.healthInsurance)} VND</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Unemployment insurance</span>
                  <span>
                    {formatCurrency(calculation.unemploymentInsurance)} VND
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>PIT taxable income</span>
                  <span>{formatCurrency(calculation.pitTaxableIncome)} VND</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Personal deduction</span>
                  <span>{formatCurrency(calculation.personalDeduction)} VND</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Dependant deduction</span>
                  <span>
                    {formatCurrency(calculation.dependantDeduction)} VND
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>PIT</span>
                  <span>{formatCurrency(calculation.pit)} VND</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/8 pt-3 text-sm font-medium text-white">
                  <span>Total insurance</span>
                  <span>
                    {formatCurrency(calculation.employeeInsuranceTotal)} VND
                  </span>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </PageLayout>
  );
}
