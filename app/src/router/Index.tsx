import { Text } from "@mantine/core";
import { useDebtStore } from "../lib/stores/debt";

export const IndexLoader = () => {
	return [];
};

const Index = () => {
	const debts = useDebtStore((state) => state.debts);

	return (
		<div>
			{debts.map((state) => (
				<div>
					<Text>{state.value}</Text>
				</div>
			))}
		</div>
	);
};

export default Index;
