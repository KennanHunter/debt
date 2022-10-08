import { useLoaderData } from "react-router-dom";
import DebtList from "../lib/components/scaffold/DebtList/DebtList";

// Because react router uses a generic function type
// for its loaders, every value must be optional
export const DebtorLoader = ({
	params,
}: {
	params: { name?: string };
}): string => {
	return params.name || "";
};

const Debtor = () => {
	const name = useLoaderData() as ReturnType<typeof DebtorLoader>;
	return (
		<div>
			<DebtList name={name} />
		</div>
	);
};

export default Debtor;
