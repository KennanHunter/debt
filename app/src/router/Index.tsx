import { Center, Loader } from "@mantine/core";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router-dom";
import DebtorList from "../lib/components/scaffold/DebtorList/DebtorList";
import { auth } from "../lib/firebase/firebase";

export const IndexLoader = () => {
	return [];
};

const Index = () => {
	const [user, loading] = useAuthState(auth);

	const navigate = useNavigate();

	useEffect(() => {
		console.dir(user);
		if (!user && !loading) {
			navigate("/login");
		}
	}, [user, loading]);

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
