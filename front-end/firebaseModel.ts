import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { addUser } from "./src/services/API";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function loginWithEmail(
  email: string,
  password: string,
  setError: (error: any) => void
) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    setError(error.message);
  });
}

export function signUpUser(
  email: string,
  password: string,
  username: string,
  setError: (error: any) => void
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      if (auth.currentUser?.uid) {
        await addUser({
          id: auth.currentUser.uid,
          username: username,
          email: email,
        });
      }
    })
    .catch((error) => {
      setError(error.message);
    });
}
