import { createContext, useState, useContext } from "react";
import { saveData, loadData, removeData } from "../utils/storage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadData("currentUser"));

  function signUp(email, password) {
    const users = loadData("users") || [];

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }
    const newUser = { email, password };
    users.push(newUser);
    saveData("users", users);

    saveData("currentUser", newUser);
    setUser(newUser);
    return { success: true };
  }

  function login(email, password) {
    const users = loadData("users") || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (foundUser) {
      saveData("currentUser", foundUser);
      setUser(foundUser);
      return { success: true };
    } else {
      return { success: false, error: "Invalid email or password" };
    }
  }
  function logout() {
    removeData("currentUser");
    setUser(null);
  }
  function deleteAccount(email) {
  // Load all users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Filter out the current user
  const updatedUsers = users.filter((u) => u.email !== email);

  // Save updated list back to localStorage
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Remove current user session
  localStorage.removeItem("currentUser");
  setUser(null);

  return { success: true };
}


  return (
    <AuthContext.Provider value={{ signUp, user, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export function useAuth() {
  return useContext(AuthContext);
}
