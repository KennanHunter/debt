import { Navbar, Stack } from "@mantine/core";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../firebase/firebase";
import { DebtEntry } from "../../../types/debt";
import DebtListItem from "./DebtListItem";

const DebtList = ({ name }: { name: string }) => {
	const [user] = useAuthState(auth);
	const [value, loading, error] = useCollectionData(
		query(collection(db, "debts"), where("uid", "==", user?.uid))
	);
	const debts =
		value
			?.filter((value) => (value as DebtEntry).debtor === name)
			.map((value) => {
				console.dir({ Value: value });
				return value;
			}) || [];

	return (
		<Navbar position={{ left: 300 }} width={{ base: 300 }} p="xs">
			<Navbar.Section>
				<Stack>
					{debts.map((debt) => (
						<DebtListItem debt={debt as DebtEntry} />
					))}
				</Stack>
			</Navbar.Section>
		</Navbar>
	);
};

export default DebtList;
