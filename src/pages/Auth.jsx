import { useState } from "react";
import {useAuth}  from "../context/AuthContext";
import { useForm } from "react-hook-form";
//import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../pages/Auth.css"; 

export default function Auth() {
  const [authMode, setAuthMode] = useState("signup");
  //removed all hooks as I am using react-hook-form for validation and form handling
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { signUp, login } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ shouldUnregister: true }); // Add shouldUnregister option

  function onSubmit(data) {
    setError(null); // Clear old error messages
    let result;
    if (authMode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    if (result.success) {
      navigate("/");
      console.log("Authentication successful");
      
    } else {
      setError(result.error);
    }
  

    //e.preventDefault(); // Prevent the default form submission behavior
    //Email validation - would be handled by useForm
    //Password validation -would be handled by useForm
    //Confirm password validation -would be handled by useForm
    // console.log("All fields are filled out and validation is successful");
    // Call the signUp function from AuthContext.Call signup only after validation succeeds
  }

  return (
    <div className="page">
      <div className="auth-container">
        {/* {user && <p className="text-green-500">Logged in as: {user.email}</p>}
        {authMode === "login" ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <div></div>
        )} */}

        <h2 className="page-title text-orange-600 mt-4">
          {authMode === "signup" ? "Sign Up" : "Login"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="auth-form flex flex-col gap-2 w-1/3 mx-auto mt-4"
        >
          {error && <div className="error-message">{error}</div>}
          {/* EMAIL */}{" "}
          <div className="form-group">
            {" "}
            <label className="form-label"> Email </label>{" "}
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="form-input"
            />{" "}
            {errors.email && (
              <p className="error"> {errors.email.message} </p>
            )}{" "}
          </div>
          {/* PASSWORD  */}
          <div className="form-group">
            {" "}
            <label className="form-label"> Password </label>{" "}
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 20 characters",
                },
              })}
              id="new-password"
              type="password"
              placeholder="Enter your password"
              className="form-input"
            />{" "}
            {errors.password && (
              <p className="error"> {errors.password.message} </p>
            )}{" "}
          </div>
          {/* Confirm Password */}
          {authMode === "signup" && (
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm your password"
                className="form-input"
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}
          {/* SUBMIT BUTTON  */}
          <button
            type="submit"
            className="btn btn-secondary mt-3"
          >
            {authMode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>
        {/*AUTH MODE SWITCH  */}
        <div className="auth-switch">
          {authMode === "signup" ? (
            <p className="text-gray-500">
              Wanna create an account?{" "}
              <span
                onClick={() => setAuthMode("login")}
                className="text-blue-500 hover:underline"
              >
                SignUp
              </span>
            </p>
          ) : (
            <p className="text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => setAuthMode("signup")}
                className="auth-link text-blue-500 hover:underline"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
