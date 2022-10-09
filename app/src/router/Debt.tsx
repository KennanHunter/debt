import { ActionIcon, Box, Divider, Group, Paper, Title } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { useLoaderData } from "react-router-dom";
import { useDebt } from "../lib/hooks/useDebt";

export const DebtLoader = ({
	params,
}: {
	params: {
		id?: string;
	};
}): string => {
	if (!params.id) throw new Error("It seems this Debt doesn't exist anymore");

	return params.id;
};

const Debt = ({}) => {
	const id = useLoaderData() as ReturnType<typeof DebtLoader>;
	const [debt] = useDebt(id);
	return (
		<Box>
			<Paper p="sm">
				<div>
					<Group position="apart">
						<Title order={2}>{debt?.reason}</Title>
						<ActionIcon>
							<IconEdit />
						</ActionIcon>
					</Group>
					<Divider />
				</div>
				<pre>{JSON.stringify(debt, null, 4)}</pre>
			</Paper>
		</Box>
	);
};

export default Debt;
