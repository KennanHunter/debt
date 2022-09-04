import {
	collection,
	DocumentData,
	query,
	QueryDocumentSnapshot,
	where,
} from "firebase/firestore";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ListGroup from "../components/ListGroup";
import { auth, db } from "../firebase/firebase";
import { DebtEntryWithID } from "../firebase/types";

const Home: NextPage = () => {
	const [user] = useAuthState(auth);
	const router = useRouter();
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
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<div>
			<h1>Debt</h1>

			<button
				onClick={() => {
					router.push("/new");
				}}
			>
				New
			</button>

			<ul>
				{value && (
					<span>
						{(() => {
							let ret = [];

							for (let [debtor, arr] of SortByDebtor(
								value.docs
							)) {
								ret.push(
									<ListGroup
										key={debtor}
										arr={arr}
										debtor={debtor}
									/>
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
): Map<string, DebtEntryWithID[]> {
	// Schema: Debtor, Entries under said debtor
	const tieredData = new Map<string, DebtEntryWithID[]>();

	docs.map((doc) => {
		const data = { ...doc.data(), id: doc.id } as DebtEntryWithID;

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
				.map(
					(val) => ({ id: val.id, ...val.data() } as DebtEntryWithID)
				)
		);
	});

	return tieredData;
}

export default Home;
