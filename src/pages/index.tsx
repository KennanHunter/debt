import { collection, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/firebase";

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
						Collection:{" "}
						{value.docs.map((doc) => (
							<li key={doc.id}>{JSON.stringify(doc.data())}, </li>
						))}
					</span>
				)}
			</ul>
		</div>
	);
};

export default Home;
