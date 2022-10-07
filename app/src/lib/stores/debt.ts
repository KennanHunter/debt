import create from "zustand";
import { DebtEntry } from "../types/debt";

interface DebtStore {
	debts: DebtEntry[];
	addNewDebt: (newDebt: DebtEntry) => void;
}

export const useDebtStore = create<DebtStore>()((set) => ({
	debts: [],
	addNewDebt: (newDebt) =>
		set((state) => ({
			debts: [...state.debts, newDebt],
		})),
}));
