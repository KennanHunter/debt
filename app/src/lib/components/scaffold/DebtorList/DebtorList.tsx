import { Button, Center, Navbar, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDebts } from "../../../hooks/useDebts";
import { useUser } from "../../../hooks/useUser";
import { sortByDebtor } from "../../../util/sortByDebtor";
import { totalDebtValue } from "../../../util/totalDebtValue";
import Load from "../../common/Load";
import Money from "../../common/Money";
import DebtorListItem from "./DebtorListItem";

const DebtorList = () => {
	const [user] = useUser();
	const [value, loading, error] = useDebts();
	const tieredDebtors = useMemo(() => sortByDebtor(value), [value]);

	if (loading) return <Load />;

	return (
		<div>
			<Navbar p="xs" width={{ base: 300 }}>
				<Navbar.Section>
					<Stack>
						<Text sx={{ textAlign: "center" }}>
							You are currently owed
						</Text>
						<Text sx={{ textAlign: "center", color: "green" }}>
							<Money value={totalDebtValue(value)} />{" "}
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
					<Center>
						<Button
							color={"green"}
							component={Link}
							to="/new"
							style={{ width: 600, height: 50 }}
						>
							New Debt
						</Button>
					</Center>
				</Navbar.Section>
			</Navbar>
		</div>
	);
};

export default DebtorList;
