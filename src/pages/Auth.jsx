import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../pages/Auth.css";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(""); // Clear old error messages

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

    //Email validation
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    //Password validation
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    //Confirm password validation
    if (!confirmPassword) {
      setError("Confirm password is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("All fields are filled out and validation is successful");

    // Call the signUp function from AuthContext.Call signup only after validation succeeds
    const result = signUp(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }
    console.log("User signed up successfully");
  }

  function showSubmit() {
    console.log(email, password, confirmPassword);
  }
  return (
    <div className="page">
      <h2 
      className="text-orange-600 underline mt-4">Auth Page</h2>
      <form 
      id="auth-form" onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-1/3 mx-auto mt-8"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          
        />
        {error && <p className="error font-light">{error}</p>}
        <input
          id="new-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </form>
      <button
        onClick={showSubmit}
        type="submit"
        form="auth-form"
        className="btn btn-secondary text-green-500 mt-5"
      >
        Submit
      </button>
    </div>
  );
}
