import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-S1IT7zAY3LQwWJu93czFWQHh3aaV8bU",
  authDomain: "gptmutki.firebaseapp.com",
  projectId: "gptmutki",
  storageBucket: "gptmutki.appspot.com",
  messagingSenderId: "433301495586",
  appId: "1:433301495586:web:9a1c35931efb1456c5cf7b",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
