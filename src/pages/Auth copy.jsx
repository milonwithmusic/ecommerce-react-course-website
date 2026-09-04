//import React from 'react'
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import "./Auth.css";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const { signUp, user, login, logout } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    console.log(result);
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auto-container">
          {user && <p>User logged in: {user.email}</p>}
          <button onClick={() => logout()}>Logout</button>
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="auth-form"
          >
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                className="form-input"
                type="email"
                id="email"
              ></input>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                className="form-input"
                type="password"
                id="password"
              ></input>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p className="text-orange-500">
                Already have an account?{" "}
                <span
                  className="auth-link text-green-500"
                  onClick={() => setMode("login")}
                >
                  Login
                </span>{" "}
              </p>
            ) : (
              <p className="text-orange-500">
                Don't have an account?{" "}
                <span
                  className="auth-link text-green-500"
                  onClick={() => setMode("signup")}
                >
                  Signup
                </span>{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
