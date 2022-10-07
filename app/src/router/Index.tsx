import { useTheme } from "@emotion/react";
import { Navbar, Text } from "@mantine/core";
import DebtorList from "../lib/components/scaffold/DebtorList";
import { useDebtStore } from "../lib/stores/debt";

export const IndexLoader = () => {
	return [];
};

const Index = () => {
	const debts = useDebtStore((state) => state.debts);
	return (
		<div>
			<DebtorList />
			<div>
				{debts.map((state) => (
					<div>
						<Text>{state.value}</Text>
					</div>
				))}
			</div>
		</div>
	);
};

export default Index;
