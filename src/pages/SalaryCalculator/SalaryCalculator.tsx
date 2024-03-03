import { Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { Layout } from "@/components";

export function SalaryCalculatorPage() {
  useDocumentTitle("Salary Calculator");

  return (
    <Layout>
      <Text>Salary Calculator</Text>
    </Layout>
  );
}
