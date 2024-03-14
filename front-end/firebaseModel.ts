import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
import { signInWithEmailAndPassword } from 'firebase/auth';

export function signInWithEmail(
    email: string,
    password: string,
  ) {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.error(error.message);
    });
  }