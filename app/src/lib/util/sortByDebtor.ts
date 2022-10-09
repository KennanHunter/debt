import { DebtEntryWithId } from "../types/debt";

export const sortByDebtor = (
	debts: DebtEntryWithId[]
): Map<string, DebtEntryWithId[]> => {
	// Schema: Debtor, Entries under said debtor
	const tieredData = new Map<string, DebtEntryWithId[]>();

	debts.map((debt) => {
		// Only add new data if not already in it
		if (tieredData.has(debt.debtor)) return;

		tieredData.set(
			debt.debtor,
			debts
				// Get data that belongs to debtor
				.filter((val) => {
					return val.debtor === debt.debtor;
				})
		);
	});

	return tieredData;
};
