import { FieldValue, Timestamp } from "firebase/firestore";
import { TimePeriod } from "./timePeriod";

export interface DebtEntryWithID extends DebtEntry {
	id: string;
}

export interface DebtEntryWithInflation extends DebtEntry {
	adjustedValue: number;
	history?: number[];
}

export interface DebtEntry {
	uid: string;

	debtor: string;
	value: number;
	reason: string;

	interest: number;
	interestTimespan: TimePeriod;

	creationDate: Timestamp;
}
