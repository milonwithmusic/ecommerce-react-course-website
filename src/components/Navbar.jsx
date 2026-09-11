import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="text-amber-700 text-2xl font-bold">
          ShopHub
        </Link>

        {/* Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-green-500 hover:text-green-700 font-medium">
            Home
          </Link>
          <Link to="/checkout" className="text-orange-500 hover:text-orange-700 font-medium">
            Cart
          </Link>
        </div>

        {/* Auth / User */}
        {!user ? (
          <div className="flex space-x-4">
            <Link to="/auth" className="px-3 py-1 rounded bg-amber-100 text-amber-700 hover:bg-amber-200">
              Login
            </Link>
            <Link to="/auth" className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="bg-slate-100 px-3 py-1 rounded font-semibold">
              Hello, {user.email}
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
