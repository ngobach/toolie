import React from "react";
import { Button, Flex, NumberInput, Select, SimpleGrid } from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { SalaryCalculationInputs } from "./utils";

type Props = {
  initialValues: SalaryCalculationInputs | null;
  onSubmit: (formValues: SalaryCalculationInputs) => void;
};

const formSchema = z.object({
  salary: z.number().positive(),
  insuaranceSalary: z.number().min(0).nullable(),
  numberOfDependents: z.number().min(0).default(0),
  salaryMonthsPerYear: z.number().min(12, "Should be at least 12"),
  livingArea: z.union([
    z.literal("1"),
    z.literal("2"),
    z.literal("3"),
    z.literal("4"),
  ]),
});

const mockInitialValues: SalaryCalculationInputs | null = import.meta.env.DEV
  ? {
      salary: 80_000_000,
      insuaranceSalary: null,
      untaxableAllowance: 2_500_000,
      taxableAllowance: 5_000_000,
      numberOfDependents: 1,
      salaryMonthsPerYear: 14,
      livingArea: "1",
    }
  : null;

export const EntryForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const form = useForm<SalaryCalculationInputs>({
    initialValues: initialValues ??
      mockInitialValues ?? {
        salary: null!,
        insuaranceSalary: null,
        untaxableAllowance: null,
        taxableAllowance: null,
        numberOfDependents: 0,
        salaryMonthsPerYear: 12,
        livingArea: "1",
      },
    validate: zodResolver(formSchema),
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <SimpleGrid cols={{ xs: 2, sm: 3 }} spacing="lg">
        <NumberInput
          label="Salary"
          description="Gross (VND)"
          placeholder="10.000.000"
          {...form.getInputProps("salary")}
        />
        <NumberInput
          label="Untaxable allowance"
          description="(VND)"
          placeholder="2.000.000"
          {...form.getInputProps("untaxableAllowance")}
        />
        <NumberInput
          label="Taxable allowance"
          description="(VND)"
          placeholder="3.000.000"
          {...form.getInputProps("taxableAllowance")}
        />
        <NumberInput
          label="Inssuarance Salary"
          description="Gross (VND)"
          placeholder="20.000.000"
          {...form.getInputProps("inssuaranceSalary")}
        />
        <NumberInput
          label="Dependents"
          description="Number of dependents"
          placeholder="2"
          {...form.getInputProps("numberOfDependents")}
        />
        <NumberInput
          label="Salary Months"
          description="You know it!"
          placeholder="14"
          {...form.getInputProps("salaryMonthsPerYear")}
        />
        <Select
          label="Living Area"
          description="1, 2, or 3"
          placeholder="1"
          data={[
            { value: "1", label: "No. 1" },
            { value: "2", label: "No. 2" },
            { value: "3", label: "No. 3" },
            { value: "4", label: "No. 4" },
          ]}
          {...form.getInputProps("livingArea")}
        />
      </SimpleGrid>

      <Flex justify="end" mt="lg">
        <Button type="submit" size="md">
          Calculate my salary
        </Button>
      </Flex>
    </Form>
  );
};
