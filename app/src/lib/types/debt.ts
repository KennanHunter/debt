import { Timestamp } from "firebase/firestore";
import { TimePeriod } from "./timePeriod";

export interface DebtEntryProcessed extends DebtEntryWithId {
	adjustedValue: number;
}

export interface DebtEntryWithId extends DebtEntry {
	id: string;
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
