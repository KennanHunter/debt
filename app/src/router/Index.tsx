import { Center, Loader, Text } from "@mantine/core";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import DebtorList from "../lib/components/scaffold/DebtorList";
import { auth } from "../lib/firebase/firebase";
import { useDebtStore } from "../lib/stores/debt";

export const IndexLoader = () => {
	return [];
};

const Index = () => {
	const debts = useDebtStore((state) => state.debts);
	const [user, loading, error] = useAuthState(auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (!user && !loading) {
			navigate("/login");
		}
	}, [user]);

	if (loading)
		return (
			<Center>
				<Loader />
			</Center>
		);

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
