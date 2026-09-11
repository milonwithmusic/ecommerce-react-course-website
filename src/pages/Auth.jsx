import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../pages/Auth.css";

export default function Auth() {
  const [authMode, setAuthMode] = useState("signup");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { signUp, login } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ shouldUnregister: true });

  function onSubmit(data) {
    setError(null);
    let result;
    if (authMode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    if (result.success) {
      navigate("/");
      alert("Authentication successful");
    } else {
      setError(result.error || "Something went wrong.Try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          {authMode === "signup" ? "Sign Up" : "Login"}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
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
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
                maxLength: { value: 20, message: "At most 20 characters" },
                validate: (value) => {
                  if (!/[A-Z]/.test(value))
                    return "Must contain an uppercase letter";
                  if (!/[0-9]/.test(value)) return "Must contain a number";
                  if (!/[!@#$%^&*]/.test(value))
                    return "Must contain a special character";
                  return true;
                },
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password (Signup only) */}
          {authMode === "signup" && (
            <div>
              <label className="block text-gray-700 mb-1">
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
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {authMode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="text-center mt-4">
          {authMode === "signup" ? (
            <p className="text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => setAuthMode("login")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-gray-500">
              Don’t have an account?{" "}
              <span
                onClick={() => setAuthMode("signup")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
        <button
          onClick={() => {
            const result = deleteAccount(user.email);
            if (result.success) {
              alert("Account deleted successfully.");
              navigate("/"); // Redirect to home
            }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
