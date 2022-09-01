import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeUglRo4J8VMUUrGOl8jShnYOnYprvOWQ",
  authDomain: "debtapi.firebaseapp.com",
  databaseURL: "https://debtapi-default-rtdb.firebaseio.com",
  projectId: "debtapi",
  storageBucket: "debtapi.appspot.com",
  messagingSenderId: "241828412099",
  appId: "1:241828412099:web:5dac15f89d5e28f6284076",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
