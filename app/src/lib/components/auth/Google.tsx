import { Button, Image } from "@mantine/core";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import GoogleLogo from "../../../assets/GoogleLogo.svg";
import { auth } from "../../firebase/firebase";

const Google = () => {
	const [signInWithGoogle, user] = useSignInWithGoogle(auth);

	return (
		<Button
			onClick={() => {
				signInWithGoogle();
			}}
			leftIcon={<Image src={GoogleLogo} alt={"Google Logo"} />}
			variant="white"
			color="dark"
		>
			Sign in with Google
		</Button>
	);
};

export default Google;
