import { useForm } from "@tanstack/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IMaskInput } from "react-imask";
import { z } from "zod";
import { Button, PageIntro, PageLayout } from "../../components";

const areaOptions = ["I", "II", "III", "IV", "V"] as const;

const labelClassName = "text-sm font-medium text-slate-200";
const fieldClassName =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-primary-400/40 focus:bg-black/40";
const errorClassName = "mt-2 text-sm text-rose-300";

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
                  <label className="block">
                    <span className={labelClassName}>Monthly income</span>
                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 focus-within:border-primary-400/40 focus-within:bg-black/40">
                      <IMaskInput
                        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        inputMode="numeric"
                        mask={Number}
                        name={field.name}
                        onAccept={(value) => field.handleChange(String(value))}
                        onBlur={field.handleBlur}
                        placeholder="Enter monthly income"
                        radix="."
                        scale={0}
                        thousandsSeparator=","
                        unmask={false}
                        value={field.state.value}
                      />
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                        VND
                      </span>
                    </div>
                    {field.state.meta.isTouched &&
                    getFieldError(field.state.meta.errors) ? (
                      <p className={errorClassName}>
                        {getFieldError(field.state.meta.errors)}
                      </p>
                    ) : null}
                  </label>
                )}
              </form.Field>

              <form.Field
                name="dependants"
                validators={{
                  onBlur: dependantsSchema,
                }}
              >
                {(field) => (
                  <label className="block">
                    <span className={labelClassName}>Dependants</span>
                    <input
                      className={`mt-2 ${fieldClassName}`}
                      inputMode="numeric"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="Enter number of dependants"
                      type="text"
                      value={field.state.value}
                    />
                    {field.state.meta.isTouched &&
                    getFieldError(field.state.meta.errors) ? (
                      <p className={errorClassName}>
                        {getFieldError(field.state.meta.errors)}
                      </p>
                    ) : null}
                  </label>
                )}
              </form.Field>

              <form.Field
                name="socialInsuranceIncome"
                validators={{
                  onBlur: currencyFieldSchema,
                }}
              >
                {(field) => (
                  <label className="block">
                    <span className={labelClassName}>Social Insurance income</span>
                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 focus-within:border-primary-400/40 focus-within:bg-black/40">
                      <IMaskInput
                        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        inputMode="numeric"
                        mask={Number}
                        name={field.name}
                        onAccept={(value) => field.handleChange(String(value))}
                        onBlur={field.handleBlur}
                        placeholder="Enter social insurance income"
                        radix="."
                        scale={0}
                        thousandsSeparator=","
                        unmask={false}
                        value={field.state.value}
                      />
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                        VND
                      </span>
                    </div>
                    {field.state.meta.isTouched &&
                    getFieldError(field.state.meta.errors) ? (
                      <p className={errorClassName}>
                        {getFieldError(field.state.meta.errors)}
                      </p>
                    ) : null}
                  </label>
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
                  <fieldset className="block">
                    <legend className={labelClassName}>Area</legend>
                    <RadioGroup.Root
                      className="mt-3 flex flex-wrap gap-3"
                      name={field.name}
                      onValueChange={(value) =>
                        field.handleChange(value as (typeof areaOptions)[number])
                      }
                      value={field.state.value}
                    >
                      {areaOptions.map((area) => {
                        const checked = field.state.value === area;

                        return (
                          <RadioGroup.Item
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                              checked
                                ? "border-primary-400/40 bg-primary-500/12 text-white"
                                : "border-white/10 bg-black/25 text-slate-300 hover:border-white/16 hover:bg-white/[0.04]"
                            }`}
                            key={area}
                            onBlur={field.handleBlur}
                            value={area}
                          >
                            <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-current" />
                            <span>{area}</span>
                          </RadioGroup.Item>
                        );
                      })}
                    </RadioGroup.Root>
                    {field.state.meta.isTouched &&
                    getFieldError(field.state.meta.errors) ? (
                      <p className={errorClassName}>
                        {getFieldError(field.state.meta.errors)}
                      </p>
                    ) : null}
                  </fieldset>
                )}
              </form.Field>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
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
            </div>
          </form>
        </section>
      </div>
    </PageLayout>
  );
}
