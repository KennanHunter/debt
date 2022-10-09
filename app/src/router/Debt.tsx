import { Box } from "@mantine/core";
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
	return <Box>{debt?.reason}</Box>;
};

export default Debt;
