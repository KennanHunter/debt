import { Navbar, Stack } from "@mantine/core";
import { useDebts } from "../../../hooks/useDebts";
import DebtListItem from "./DebtListItem";

const DebtList = ({ name }: { name: string }) => {
	const [value, loading, error] = useDebts();

	const debts =
		value
			?.filter((value) => value.debtor === name)
			.map((value) => {
				console.dir({ Value: value });
				return value;
			}) || [];

	return (
		<Navbar position={{ left: 300 }} width={{ base: 300 }} p="xs">
			<Navbar.Section>
				<Stack>
					{debts.map((debt) => (
						<DebtListItem debt={debt} />
					))}
				</Stack>
			</Navbar.Section>
		</Navbar>
	);
};

export default DebtList;
