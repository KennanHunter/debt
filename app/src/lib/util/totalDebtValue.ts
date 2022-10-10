import { DebtEntryProcessed } from "../types/debt";

export const totalDebtValue = (debts: DebtEntryProcessed[]): number =>
	debts.reduce((prev, cur) => prev + cur.adjustedValue, 0);
