import { Navbar, Stack, Text } from "@mantine/core";
import { DebtEntry } from "../../types/debt";
import { totalDebtValue } from "../../util/totalDebtValue";
import DebtorListItem from "./DebtorListItem";

const DebtorList = () => {
	const users = [
		{ name: "Kennan", value: 10 },
		{ name: "epic", value: 20 },
	];
	return (
		<div>
			<Navbar p="xs" width={{ base: 300 }}>
				<Navbar.Section>
					<Stack>
						<Text sx={{ textAlign: "center" }}>
							You are currently owed
						</Text>
						<Text sx={{ textAlign: "center", color: "green" }}>
							$
							{totalDebtValue(
								users as any as DebtEntry[]
							).toFixed(2)}
						</Text>
					</Stack>
				</Navbar.Section>
				<Navbar.Section grow mt="md">
					<Stack>
						{users.map((user) => (
							<DebtorListItem {...user} />
						))}
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
