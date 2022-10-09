import { Outlet } from "react-router-dom";
import Load from "../lib/components/common/Load";
import DebtorList from "../lib/components/scaffold/DebtorList/DebtorList";
import { useUser } from "../lib/hooks/useUser";

export const IndexLoader = () => {
	return [];
};

const Index = () => {
	const [_, loading] = useUser();

	if (loading) return <Load />;

	return (
		<div>
			<DebtorList />
			<Outlet />
		</div>
	);
};

export default Index;
