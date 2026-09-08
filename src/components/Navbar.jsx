import { Link } from "react-router";
//import { useContext } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links" className="flex-2">
          <Link
            to="/"
            className="navbar-brand"
            className="text-amber-700 text-2xl"
          />
          ShopHub
          <Link />
          <div className="navbar-link">
            <Link to="/" className="text-green-400 me-2">
              Home
            </Link>
            <Link to="/checkout" className="navbar-link text-orange-400 ms-2">
              Cart
            </Link>
          </div>
          {!user ? (
            <div className="navbar-auth-links">
              <Link to="/auth" className="btn text-amber-500">
                Login
              </Link>
              <Link to="/auth" className="btn text-green-500">
                Signup
              </Link>
            </div>
          ) : (
            <div className="navbar-user">
              <span className="bg-slate-100 font-black" >Hello, {user.email}</span>
            <button 
            onClick={logout}
            className="btn btn-secondary ms-5">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
