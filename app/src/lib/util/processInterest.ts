import { Timestamp } from "firebase/firestore";
import { DebtEntryProcessed, DebtEntryWithId } from "../types/debt";
import { TimePeriod } from "../types/timePeriod";

export const processInterest = (
	debtEntry: DebtEntryWithId
): DebtEntryProcessed => {
	if (debtEntry.interestTimespan === TimePeriod.None) {
		return { ...debtEntry, adjustedValue: debtEntry.value };
	}

	const daysElapsed = Math.floor(
		(Timestamp.now().seconds - debtEntry.creationDate.seconds) / 86400
	);
	const interestCompounds = 1;

	let elapsed: number;
	if (debtEntry.interestTimespan === TimePeriod.Day) {
		elapsed = daysElapsed;
	} else if (debtEntry.interestTimespan === TimePeriod.Week) {
		elapsed = Math.floor(daysElapsed / 7);
	} else if (debtEntry.interestTimespan === TimePeriod.Month) {
		elapsed = Math.floor(daysElapsed / 30);
	} else {
		throw new Error("Shut up typescript");
	}

	// Standard compounding Interest formula
	// A = P(1 + r/n)^(n*t)
	// LINK: https://g.co/kgs/F27Rho
	return {
		...debtEntry,
		adjustedValue: elapsed // Only apply interest if compounding period != 0
			? debtEntry.value *
			  (1 + (debtEntry.interest * 0.01) / interestCompounds) **
					(interestCompounds * elapsed)
			: debtEntry.value,
	};
};
