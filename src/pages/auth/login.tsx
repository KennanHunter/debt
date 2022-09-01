import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export const Login = () => {
	const [signInWithGoogle, user, _, __] = useSignInWithGoogle(auth);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user]);

	return (
		<div>
			<h1>login</h1>
			<button
				onClick={() => {
					signInWithGoogle();
				}}
			>
				Sign in with Google
			</button>
		</div>
	);
};

export default Login;
