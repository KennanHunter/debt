import { collection, FirestoreError, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import { DebtEntryWithId } from "../types/debt";
import { useUser } from "./useUser";

export const useDebts = (): [
	DebtEntryWithId[],
	boolean,
	FirestoreError | undefined
] => {
	const [user] = useUser();
	const [value, loading, error] = useCollection(
		query(collection(db, "debts"), where("uid", "==", user?.uid))
	);

	if (loading || error) {
		return [[], loading, error];
	}

	return [
		(value?.docs.map(
			(doc) => ({ ...doc.data(), id: doc.id } as DebtEntryWithId)
		) as DebtEntryWithId[]) || ([] as DebtEntryWithId[]),
		false,
		undefined,
	];
};
