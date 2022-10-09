import { DebtEntry, DebtEntryWithId } from "../types/debt";

export const stripId = (old: DebtEntryWithId): DebtEntry => ({
	uid: old.uid,
	debtor: old.debtor,
	value: old.value,
	reason: old.reason,
	interest: old.interest,
	interestTimespan: old.interestTimespan,
	creationDate: old.creationDate,
});
