import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../firebase/auth";

export default function SingIn({ setUser }) {
  return (
    <div className="singin">
      <button
        onClick={(e) => {
          signInWithPopup(auth, provider)
            .then((result) => {
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              const user = result.user;
              setUser(user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.customData.email;
              const credential = GoogleAuthProvider.credentialFromError(error);
            });
        }}
        className="singin__button"
      >
        Google
      </button>
    </div>
  );
}
