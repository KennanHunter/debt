import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

function Dump() {
  const [user] = useAuthState(auth);
  return (
    <div>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </div>
  );
}

export default Dump;
