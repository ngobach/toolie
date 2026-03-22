import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Button,
  FormActions,
  FormField,
  MoneyInputField,
  PageIntro,
  PageLayout,
  RadioCardGroup,
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
  monthlyIncome: currencyFieldSchema,
  socialInsuranceIncome: currencyFieldSchema,
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
      area: "I" as (typeof areaOptions)[number],
      dependants: "",
      monthlyIncome: "",
      socialInsuranceIncome: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const parsed = formSchema.parse(value);

      console.log("gross-to-net form submitted", {
        ...parsed,
        dependants: Number(parsed.dependants),
        monthlyIncome: Number(parsed.monthlyIncome.replaceAll(",", "")),
        socialInsuranceIncome: Number(
          parsed.socialInsuranceIncome.replaceAll(",", ""),
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
            <div className="grid gap-6 md:grid-cols-2">
              <form.Field
                name="monthlyIncome"
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
                    name="Monthly income"
                    onBlur={field.handleBlur}
                    onValueChange={field.handleChange}
                    placeholder="Enter monthly income"
                    value={field.state.value}
                  />
                )}
              </form.Field>

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
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-primary-400/40 focus:bg-black/40"
                      inputMode="numeric"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="Enter number of dependants"
                      type="text"
                      value={field.state.value}
                    />
                  </FormField>
                )}
              </form.Field>

              <form.Field
                name="socialInsuranceIncome"
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
                    name="Social Insurance income"
                    onBlur={field.handleBlur}
                    onValueChange={field.handleChange}
                    placeholder="Enter social insurance income"
                    value={field.state.value}
                  />
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
                  <RadioCardGroup
                    error={
                      field.state.meta.isTouched
                        ? getFieldError(field.state.meta.errors)
                        : undefined
                    }
                    label="Area"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onValueChange={(value) =>
                      field.handleChange(value as (typeof areaOptions)[number])
                    }
                    options={areaOptionItems}
                    value={field.state.value}
                  />
                )}
              </form.Field>
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
