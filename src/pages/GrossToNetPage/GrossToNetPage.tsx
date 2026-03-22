import { useForm } from "@tanstack/react-form";
import { Button, PageIntro, PageLayout } from "../../components";

const areaOptions = ["I", "II", "III", "IV", "V"] as const;

const fieldClassName =
  "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-primary-400/40 focus:bg-black/40";

const labelClassName = "text-sm font-medium text-slate-200";

export function GrossToNetPage() {
  const form = useForm({
    defaultValues: {
      area: "I",
      dependants: "",
      monthlyIncome: "",
      socialInsuranceIncome: "",
    },
    onSubmit: async ({ value }) => {
      console.log("gross-to-net form submitted", value);
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
              <form.Field name="monthlyIncome">
                {(field) => (
                  <label className="block">
                    <span className={labelClassName}>Monthly income</span>
                    <input
                      className={fieldClassName}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="Enter monthly income"
                      type="number"
                      value={field.state.value}
                    />
                  </label>
                )}
              </form.Field>

              <form.Field name="dependants">
                {(field) => (
                  <label className="block">
                    <span className={labelClassName}>Dependants</span>
                    <input
                      className={fieldClassName}
                      min="0"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="Enter number of dependants"
                      type="number"
                      value={field.state.value}
                    />
                  </label>
                )}
              </form.Field>

              <form.Field name="socialInsuranceIncome">
                {(field) => (
                  <label className="block">
                    <span className={labelClassName}>Social Insurance income</span>
                    <input
                      className={fieldClassName}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      placeholder="Enter social insurance income"
                      type="number"
                      value={field.state.value}
                    />
                  </label>
                )}
              </form.Field>

              <form.Field name="area">
                {(field) => (
                  <fieldset className="block">
                    <legend className={labelClassName}>Area</legend>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {areaOptions.map((area) => {
                        const checked = field.state.value === area;

                        return (
                          <label
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                              checked
                                ? "border-primary-400/40 bg-primary-500/12 text-white"
                                : "border-white/10 bg-black/25 text-slate-300 hover:border-white/16 hover:bg-white/[0.04]"
                            }`}
                            key={area}
                          >
                            <input
                              checked={checked}
                              className="sr-only"
                              name={field.name}
                              onBlur={field.handleBlur}
                              onChange={() => field.handleChange(area)}
                              type="radio"
                              value={area}
                            />
                            <span>{area}</span>
                          </label>
                        );
                      })}
                    </div>
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
