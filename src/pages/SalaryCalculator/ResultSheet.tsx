import React from "react";
import { CurrencySymbols, SalaryCalculationResult } from "./utils";
import {
  Box,
  Button,
  Flex,
  NumberFormatter,
  SimpleGrid,
  Table,
} from "@mantine/core";

type Props = {
  result: SalaryCalculationResult;
};

export const ResultSheet: React.FC<Props> = ({ result }) => {
  const handleExport = () => {
    alert("@TODO: later");
  };

  return (
    <>
      <SimpleGrid cols={{ sm: 3 }} spacing="lg" id="result-tables">
        <Box>
          <Table captionSide="top" withTableBorder withColumnBorders>
            <Table.Caption>Inputs</Table.Caption>

            <Table.Thead>
              <Table.Tr>
                <Table.Th w="30%">Description</Table.Th>
                <Table.Th w="30%">Amount</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Salary</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.input.salary}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Untaxable allowances</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.input.untaxableAllowance ?? 0}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Taxable allowances</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.input.taxableAllowance ?? 0}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Insurance salary</Table.Td>
                <Table.Td>
                  {typeof result.input.insuaranceSalary === "number" ? (
                    <NumberFormatter
                      value={result.input.insuaranceSalary}
                      suffix={CurrencySymbols.VND}
                      thousandSeparator
                    />
                  ) : (
                    "N/A"
                  )}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Dependants</Table.Td>
                <Table.Td>{result.input.numberOfDependents}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Salary months per year</Table.Td>
                <Table.Td>{result.input.salaryMonthsPerYear}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Living area</Table.Td>
                <Table.Td>{result.input.livingArea}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Box>

        <Box>
          <Table withTableBorder withColumnBorders captionSide="top">
            <Table.Caption>Monthly</Table.Caption>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w="30%">Description</Table.Th>
                <Table.Th w="30%">Amount</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Insurance</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.insurances.total}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr c="gray" fs="italic">
                <Table.Td>Social Insurance</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.insurances.social}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr c="gray" fs="italic">
                <Table.Td>Health Insurance</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.insurances.health}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr c="gray" fs="italic">
                <Table.Td>Unemployment Insurance</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.insurances.unemployment}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Taxable income</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.taxableIncome}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Taxable deductions</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.deduction.total}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr c="gray" fs="italic">
                <Table.Td>Personal deduction</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.deduction.personal}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr c="gray" fs="italic">
                <Table.Td>Dependents deduction</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.deduction.dependent}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Addressable income</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.actualTaxedIncome}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>PIT</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.tax}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr fw="bold">
                <Table.Td>NET income</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.monthly.netIncome}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Box>

        <Box>
          <Table withTableBorder withColumnBorders captionSide="top">
            <Table.Caption>Yearly</Table.Caption>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w="30%">Description</Table.Th>
                <Table.Th w="30%">Amount</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Total income</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.yearly.totalIncome}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Total NET income</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    value={result.yearly.totalNetIncome}
                    suffix={CurrencySymbols.VND}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Box>
      </SimpleGrid>

      <Flex mt="lg" justify="end">
        <Button onClick={handleExport}>Export</Button>
      </Flex>
    </>
  );
};
