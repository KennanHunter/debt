import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

export const useUser = (): ReturnType<typeof useAuthState> => {
	const [user, loading, err] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user && !loading) {
			navigate("/login");
		}
	}, [user, loading]);

	return [user, loading, err];
};
