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
  SegmentControl,
} from "../../components";

const areaOptions = ["I", "II", "III", "IV", "V"] as const;

const currencyFieldSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .refine((value) => Number(value.replaceAll(",", "")) > 0, {
    message: "Please enter an amount greater than 0",
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
  fixedSalary: currencyFieldSchema,
  monthlyBonusAndTaxableAllowance: currencyFieldSchema,
  nonTaxableAllowance: currencyFieldSchema,
});

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

      console.log("gross-to-net form submitted", {
        ...parsed,
        dependants: Number(parsed.dependants),
        fixedSalary: Number(parsed.fixedSalary.replaceAll(",", "")),
        monthlyBonusAndTaxableAllowance: Number(
          parsed.monthlyBonusAndTaxableAllowance.replaceAll(",", ""),
        ),
        nonTaxableAllowance: Number(
          parsed.nonTaxableAllowance.replaceAll(",", ""),
        ),
      });
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
                    onBlur: currencyFieldSchema,
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
                    onBlur: currencyFieldSchema,
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
                    onBlur: currencyFieldSchema,
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
                    <SegmentControl
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
                onClick={() => form.reset()}
                type="button"
                variant="secondary"
              >
                Reset
              </Button>
            </FormActions>
          </form>
        </section>
      </div>
    </PageLayout>
  );
}
