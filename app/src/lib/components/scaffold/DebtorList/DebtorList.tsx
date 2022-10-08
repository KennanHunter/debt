import { Navbar, Stack, Text } from "@mantine/core";
import { collection, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../firebase/firebase";
import { sortByDebtor } from "../../../util/sortByDebtor";
import { totalDebtValue } from "../../../util/totalDebtValue";
import DebtorListItem from "./DebtorListItem";

const DebtorList = () => {
	const [user] = useAuthState(auth);
	const [value, loading, error] = useCollection(
		query(collection(db, "debts"), where("uid", "==", user?.uid))
	);
	const tieredDebtors = useMemo(
		() => sortByDebtor(value?.docs || []),
		[value]
	);

	return (
		<div>
			<Navbar p="xs" width={{ base: 300 }}>
				<Navbar.Section>
					<Stack>
						<Text sx={{ textAlign: "center" }}>
							You are currently owed
						</Text>
						<Text sx={{ textAlign: "center", color: "green" }}>
							${totalDebtValue(value?.docs || []).toFixed(2)}
						</Text>
					</Stack>
				</Navbar.Section>
				<Navbar.Section grow mt="md">
					<Stack>
						{(() => {
							let ret = [];

							for (let [debtor, arr] of tieredDebtors) {
								ret.push(
									<DebtorListItem
										key={debtor}
										arr={arr}
										debtor={debtor}
									/>
								);
							}

							return ret;
						})()}
					</Stack>
				</Navbar.Section>
				<Navbar.Section>
					<Text>TODO: Settings</Text>
				</Navbar.Section>
			</Navbar>
		</div>
	);
};

export default DebtorList;
