import { Divider, Paper } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Layout } from "@/components";
import { EntryForm } from "./EntryForm";
import {
  SalaryCalculationInputs,
  SalaryCalculationResult,
  calculateSalary,
} from "./utils";
import { useState } from "react";
import { ResultSheet } from "./ResultSheet";

type Store = {
  lastFormValues: SalaryCalculationInputs | null;
  setLastFormValues: (values: SalaryCalculationInputs) => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      lastFormValues: null as SalaryCalculationInputs | null,
      setLastFormValues: (values: SalaryCalculationInputs) =>
        set({ lastFormValues: values }),
    }),
    {
      name: "salary-calculator",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function SalaryCalculatorPage() {
  useDocumentTitle("Salary Calculator");

  const { lastFormValues, setLastFormValues } = useStore();
  const [result, setResult] = useState<SalaryCalculationResult | null>(null);

  const handleSubmit = (formValues: SalaryCalculationInputs): void => {
    const result = calculateSalary(formValues);
    setLastFormValues(formValues);
    setResult(result);
  };

  return (
    <Layout>
      <Paper withBorder p="lg" bg="white">
        <EntryForm initialValues={lastFormValues} onSubmit={handleSubmit} />
      </Paper>

      {!!result && (
        <>
          <Divider label="Result" my="lg" />

          <Paper withBorder p="lg" bg="white">
            <ResultSheet result={result} />
          </Paper>
        </>
      )}
    </Layout>
  );
}
