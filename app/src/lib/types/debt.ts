import { Timestamp } from "firebase/firestore";
import { TimePeriod } from "./timePeriod";

// export interface DebtEntryWithInflation extends DebtEntry {
// 	adjustedValue: number;
// 	history?: number[];
// }

export interface DebtEntry {
	id: string;
	uid: string;

	debtor: string;
	value: number;
	reason: string;

	interest: number;
	interestTimespan: TimePeriod;

	creationDate: Timestamp;
}
