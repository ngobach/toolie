import React from "react";
import {
  ActionIcon,
  Button,
  Flex,
  NumberInput,
  Select,
  SimpleGrid,
} from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import {
  IconFileExport,
  IconFileImport,
  IconReload,
} from "@tabler/icons-react";
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

const emptyInitialValues: SalaryCalculationInputs = {
  salary: null!,
  insuaranceSalary: null,
  untaxableAllowance: null,
  taxableAllowance: null,
  numberOfDependents: 0,
  salaryMonthsPerYear: 12,
  livingArea: "1",
};

export const EntryForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const form = useForm<SalaryCalculationInputs>({
    initialValues: initialValues ?? mockInitialValues ?? emptyInitialValues,
    onValuesChange(values) {
      if (values.insuaranceSalary === ("" as unknown)) {
        values.insuaranceSalary = null;
      }
    },
    validate: zodResolver(formSchema),
  });

  const handleImportForm = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.addEventListener("change", (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const json = event.target.result as string;
            form.setValues(JSON.parse(json));
          }
        };
        reader.readAsText(file);
      }
    });

    fileInput.click();
  };

  const handleExportForm = () => {
    const json = JSON.stringify(form.values, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "salary-calculator.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetForm = () => {
    form.setInitialValues(mockInitialValues ?? emptyInitialValues);
    form.reset();
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <SimpleGrid cols={{ xs: 2, sm: 3 }} spacing="lg">
        <NumberInput
          label="Basic salary"
          suffix="₫"
          placeholder="10,000,000"
          thousandSeparator=","
          {...form.getInputProps("salary")}
        />
        <NumberInput
          label="Non-taxable allowance"
          suffix="₫"
          placeholder="2,000,000"
          thousandSeparator=","
          {...form.getInputProps("untaxableAllowance")}
        />
        <NumberInput
          label="Taxable allowance"
          suffix="₫"
          placeholder="3,000,000"
          thousandSeparator=","
          {...form.getInputProps("taxableAllowance")}
        />
        <NumberInput
          label="Insuarance calculation salary"
          suffix="₫"
          description="Default to basic salary"
          placeholder="20,000,000"
          thousandSeparator=","
          {...form.getInputProps("insuaranceSalary")}
        />
        <NumberInput
          label="Dependents"
          description="Number of dependents"
          placeholder="2"
          {...form.getInputProps("numberOfDependents")}
        />
        <NumberInput
          label="Salary months"
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

      <Flex justify="end" mt="lg" gap="xs">
        <ActionIcon.Group>
          <ActionIcon
            type="button"
            variant="default"
            size="input-sm"
            onClick={handleImportForm}
          >
            <IconFileImport />
          </ActionIcon>

          <ActionIcon
            type="button"
            variant="default"
            size="input-sm"
            onClick={handleExportForm}
          >
            <IconFileExport />
          </ActionIcon>

          <ActionIcon
            type="button"
            variant="default"
            size="input-sm"
            onClick={handleResetForm}
          >
            <IconReload />
          </ActionIcon>
        </ActionIcon.Group>
        <Button type="submit">Calculate my salary</Button>
      </Flex>
    </Form>
  );
};
