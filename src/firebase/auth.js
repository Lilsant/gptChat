import { GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";
import { getAuth, signInWithPopup } from "firebase/auth";

export const provider = new GoogleAuthProvider();

export const auth = getAuth();

