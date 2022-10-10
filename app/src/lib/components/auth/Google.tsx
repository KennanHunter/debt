import { Button, Image } from "@mantine/core";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../../assets/GoogleLogo.svg";
import { auth } from "../../firebase/firebase";

const Google = () => {
	const [signInWithGoogle, user] = useSignInWithGoogle(auth);
	const navigate = useNavigate();

	return (
		<Button
			onClick={() => {
				signInWithGoogle().then(() => {
					navigate("/");
				});
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
