import { FirestoreError } from "firebase/firestore";
import { useDebts } from "./useDebts";

export const useAllDebtors = (): [
	string[] | undefined,
	boolean,
	FirestoreError | undefined
] => {
	const [debts, loading, error] = useDebts();

	if (loading || error) {
		return [undefined, loading, error];
	}

	return [
		[...new Set(debts.map((val) => val.debtor))].sort(),
		false,
		undefined,
	];
};
