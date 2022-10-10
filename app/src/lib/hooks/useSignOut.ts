import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const useSignOut = () => () => {
	signOut(auth);
};
