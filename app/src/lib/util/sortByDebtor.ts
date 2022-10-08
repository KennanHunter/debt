import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { DebtEntry } from "../types/debt";

export const sortByDebtor = (
	docs: QueryDocumentSnapshot<DocumentData>[]
): Map<string, DebtEntry[]> => {
	// Schema: Debtor, Entries under said debtor
	const tieredData = new Map<string, DebtEntry[]>();

	docs.map((doc) => {
		const data = { id: doc.id, ...doc.data() } as DebtEntry;

		// Only add new data if not already in it
		if (tieredData.has(data.debtor)) return;

		tieredData.set(
			data.debtor,
			docs
				// Get data that belongs to debtor
				.filter((val) => {
					return val.data().debtor === data.debtor;
				})
				// Transform data to raw rep
				.map((val) => ({ id: val.id, ...val.data() } as DebtEntry))
		);
	});

	return tieredData;
};
