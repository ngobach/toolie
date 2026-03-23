import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GrossToNetSnapshotValues = {
  area: "I" | "II" | "III" | "IV";
  dependants: string;
  fixedSalary: string;
  monthlyBonusAndTaxableAllowance: string;
  nonTaxableAllowance: string;
};

export type GrossToNetSnapshotCalculation = {
  area: "I" | "II" | "III" | "IV";
  dependantDeduction: number;
  dependants: number;
  employeeInsuranceTotal: number;
  finalNetIncome: number;
  fixedSalary: number;
  grossIncome: number;
  healthInsurance: number;
  monthlyBonusAndTaxableAllowance: number;
  nonTaxableAllowance: number;
  personalDeduction: number;
  pit: number;
  pitTaxableIncome: number;
  socialInsurance: number;
  taxableIncomeBeforeDeductions: number;
  unemploymentInsurance: number;
};

export type GrossToNetSnapshot = {
  calculation: GrossToNetSnapshotCalculation;
  submittedAt: string;
  values: GrossToNetSnapshotValues;
};

type GrossToNetSnapshotStore = {
  clearSnapshot: () => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  setSnapshot: (snapshot: GrossToNetSnapshot) => void;
  snapshot: GrossToNetSnapshot | null;
};

export const useGrossToNetSnapshotStore = create<GrossToNetSnapshotStore>()(
  persist(
    (set) => ({
      clearSnapshot: () => set({ snapshot: null }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setSnapshot: (snapshot) => set({ snapshot }),
      snapshot: null,
    }),
    {
      name: "gross-to-net-submission",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        snapshot: state.snapshot,
      }),
    },
  ),
);
