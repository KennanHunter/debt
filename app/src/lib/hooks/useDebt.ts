import { doc, FirestoreError } from "@firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import { DebtEntryWithId } from "../types/debt";
import { processInterest } from "../util/processInterest";

export const useDebt = (
	id: string
): [DebtEntryWithId | undefined, boolean, FirestoreError | undefined] => {
	const [value, loading, error] = useDocument(doc(db, "debts", id));

	if (loading || error) return [undefined, loading, error];

	return [
		processInterest({ ...value?.data(), id: value?.id } as DebtEntryWithId),
		loading,
		error,
	];
};
