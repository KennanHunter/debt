import {
	collection,
	DocumentData,
	query,
	QueryDocumentSnapshot,
	where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ListGroup from "../components/ListGroup";
import { auth, db } from "../firebase/firebase";
import { DBType } from "../firebase/types";

const Home: NextPage = () => {
	const [user] = useAuthState(auth);
	const [value, loading, error] = useCollection(
		query(
			collection(db, "debts"),
			where(
				"uid",
				"==",
				(
					user || {
						uid: "throwaway",
					}
				).uid
			)
			// orderBy("debtor")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<div>
			<h1>Debt</h1>

			<ul>
				{value && (
					<span>
						{(() => {
							let ret = [];

							for (let [debtor, arr] of SortByDebtor(
								value.docs
							)) {
								ret.push(
									<ListGroup arr={arr} debtor={debtor} />
								);
							}

							return ret;
						})()}
					</span>
				)}
			</ul>
		</div>
	);
};

function SortByDebtor(
	docs: QueryDocumentSnapshot<DocumentData>[]
): Map<string, DBType[]> {
	const tieredData = new Map();

	docs.map((doc) => {
		const data = doc.data() as DBType;

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
				.map((val) => val.data())
		);
	});

	return tieredData;
}

export default Home;
