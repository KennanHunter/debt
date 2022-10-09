import { Navbar, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import { useDebts } from "../../../hooks/useDebts";
import { useUser } from "../../../hooks/useUser";
import { sortByDebtor } from "../../../util/sortByDebtor";
import { totalDebtValue } from "../../../util/totalDebtValue";
import DebtorListItem from "./DebtorListItem";

const DebtorList = () => {
	const [user] = useUser();
	const [value, loading, error] = useDebts();
	const tieredDebtors = useMemo(() => sortByDebtor(value), [value]);

	return (
		<div>
			<Navbar p="xs" width={{ base: 300 }}>
				<Navbar.Section>
					<Stack>
						<Text sx={{ textAlign: "center" }}>
							You are currently owed
						</Text>
						<Text sx={{ textAlign: "center", color: "green" }}>
							${totalDebtValue(value).toFixed(2)}
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
