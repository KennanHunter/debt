import { collection, FirestoreError, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import { DebtEntryProcessed, DebtEntryWithId } from "../types/debt";
import { processInterest } from "../util/processInterest";
import { useUser } from "./useUser";

export const useDebts = (): [
	DebtEntryProcessed[],
	boolean,
	FirestoreError | Error | undefined
] => {
	const [user, userLoading, userError] = useUser();

	if (userLoading) return [[], userLoading, userError];

	const [value, collectionLoading, collectionError] = useCollection(
		query(collection(db, "debts"), where("uid", "==", user?.uid))
	);

	if (collectionLoading || collectionError) {
		return [[], collectionLoading, collectionError];
	}

	return [
		value?.docs.map((doc) =>
			processInterest({
				...doc.data(),
				id: doc.id,
			} as DebtEntryWithId)
		) || ([] as DebtEntryProcessed[]),
		false,
		undefined,
	];
};
