export interface DebtEntryWithID extends DebtEntryNoID {
	id: string;
}

export interface DebtEntryNoID {
	uid: string;

	debtor: string;
	value: number;
	reason: string;

	interest: number;
}
