import { Center, Loader } from "@mantine/core";
import { Outlet } from "react-router-dom";
import DebtorList from "../lib/components/scaffold/DebtorList/DebtorList";
import { useUser } from "../lib/hooks/useUser";

export const IndexLoader = () => {
	return [];
};

const Index = () => {
	const [_, loading] = useUser();

	if (loading)
		return (
			<Center>
				<Loader />
			</Center>
		);

	return (
		<div>
			<DebtorList />
			<Outlet />
		</div>
	);
};

export default Index;
