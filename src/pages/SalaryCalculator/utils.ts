export const CurrencySymbols = {
  VND: "₫",
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export type SalaryCalculationInputs = {
  salary: number;
  insuaranceSalary: number | null;
  taxableAllowance: number | null;
  untaxableAllowance: number | null;
  numberOfDependents: number;
  livingArea: "1" | "2" | "3" | "4" | null;
  salaryMonthsPerYear: number;
};

type MonthlyIncomeBreakdown = {
  income: number;
  insurances: {
    social: number;
    health: number;
    unemployment: number;
    total: number;
  };
  taxableIncome: number;
  deduction: {
    personal: number;
    dependent: number;
    total: number;
  };
  actualTaxedIncome: number;
  tax: number;
  netIncome: number;
};

type YearlyBreakdown = {
  totalIncome: number;
  totalNetIncome: number;
};

export type SalaryCalculationResult = {
  input: SalaryCalculationInputs;
  monthly: MonthlyIncomeBreakdown;
  yearly: YearlyBreakdown;
};

const getAreaMinimumSalary = (
  area: SalaryCalculationInputs["livingArea"]
): number => {
  area = area ?? "1";

  switch (area) {
    case "1":
      return 4_960_000;
    case "2":
      return 4_410_000;
    case "3":
      return 3_860_000;
    case "4":
      return 3_450_000;
  }
};

const calculateTax = (taxableIncome: number): number => {
  if (taxableIncome <= 5_000_000) {
    return taxableIncome * 0.05;
  }

  if (taxableIncome <= 10_000_000) {
    return taxableIncome * 0.1 - 250_000;
  }

  if (taxableIncome <= 18_000_000) {
    return taxableIncome * 0.15 - 750_000;
  }

  if (taxableIncome <= 32_000_000) {
    return taxableIncome * 0.2 - 1_650_000;
  }

  if (taxableIncome <= 52_000_000) {
    return taxableIncome * 0.25 - 3_250_000;
  }

  if (taxableIncome <= 80_000_000) {
    return taxableIncome * 0.3 - 5_850_000;
  }

  return taxableIncome * 0.35 - 9_850_000;
};

const calculateMonthly = (
  input: SalaryCalculationInputs
): MonthlyIncomeBreakdown => {
  const totalIncome =
    input.salary +
    (input.taxableAllowance ?? 0) +
    (input.untaxableAllowance ?? 0);
  const baseSalary = 2_340_000;
  const areaMinSalary = getAreaMinimumSalary(input.livingArea);
  const insuaranceSalary = input.insuaranceSalary ?? input.salary;
  const socialInsurance = clamp(
    insuaranceSalary * 0.08,
    areaMinSalary * 0.08,
    baseSalary * 20 * 0.08
  );
  const healthInsurance = clamp(
    insuaranceSalary * 0.015,
    areaMinSalary * 0.015,
    baseSalary * 20 * 0.015
  );
  const unemploymentInsurance = clamp(
    insuaranceSalary * 0.01,
    areaMinSalary * 0.01,
    areaMinSalary * 20 * 0.01
  );
  const totalInsurance =
    socialInsurance + healthInsurance + unemploymentInsurance;
  const taxableIncome =
    totalIncome - (input.untaxableAllowance ?? 0) - totalInsurance;
  const personalDeduction = 11_000_000;
  const dependentDeduction = 4_400_000 * input.numberOfDependents;
  const totalDeduction = personalDeduction + dependentDeduction;
  const actualTaxedIncome = Math.max(0, taxableIncome - totalDeduction);
  const tax = calculateTax(actualTaxedIncome);
  const netIncome = taxableIncome - tax + (input.untaxableAllowance ?? 0);

  return {
    income: totalIncome,
    insurances: {
      social: socialInsurance,
      health: healthInsurance,
      unemployment: unemploymentInsurance,
      total: totalInsurance,
    },
    taxableIncome,
    deduction: {
      personal: personalDeduction,
      dependent: dependentDeduction,
      total: totalDeduction,
    },
    actualTaxedIncome,
    tax,
    netIncome,
  };
};

export const calculateSalary = (
  input: SalaryCalculationInputs
): SalaryCalculationResult => {
  const monthly = calculateMonthly(input);
  const yearlyBase = calculateMonthly({
    ...input,
    salary: input.salary * (input.salaryMonthsPerYear / 12),
    insuaranceSalary: input.insuaranceSalary ?? input.salary,
  });
  const yearly = {
    totalIncome: yearlyBase.income * 12,
    totalNetIncome: yearlyBase.netIncome * 12,
  };
  return { input, monthly, yearly };
};
