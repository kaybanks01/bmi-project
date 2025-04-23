import React, { useState } from "react";
import "./auth.css";
import Signin from "./signin";
import Signup from "./signup";

const Auth = () => {
  const [isSignin, setIsSignin] = useState(true);

  const toggleView = () => setIsSignin((prev) => !prev);

  return (
    <div className={`container ${isSignin ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <Signup />
      </div>
      <div className="form-container sign-in-container">
        <Signin />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={toggleView}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Create Account</h1>
            <p>Enter your details and start your journey with us</p>
            <button className="ghost" onClick={toggleView}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
