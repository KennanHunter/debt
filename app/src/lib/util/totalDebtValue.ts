import { DebtEntryWithId } from "../types/debt";

export const totalDebtValue = (debts: DebtEntryWithId[]): number =>
	debts.reduce((prev, cur) => prev + cur.value, 0);
