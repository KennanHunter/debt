import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const totalDebtValue = (
	debtsData: QueryDocumentSnapshot<DocumentData>[]
): number => {
	return debtsData.reduce(
		(previousValue, currentValue) =>
			previousValue + (currentValue.data() as DocumentData).value,
		0
	);
};
