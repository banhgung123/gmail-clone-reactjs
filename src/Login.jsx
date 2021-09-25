import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider, signInWithPopup } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cellphones.com.vn/sforum/wp-content/uploads/2020/10/newgmaillogo.0.jpg"
          alt=""
        />
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
