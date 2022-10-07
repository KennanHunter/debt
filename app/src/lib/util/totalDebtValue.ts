import { DebtEntry } from "../types/debt";


export const totalDebtValue = (debts: DebtEntry[]): number => {
	return debts.reduce(
		(previousValue, currentValue) => previousValue + currentValue.value,
		0
	);
};
