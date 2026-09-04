import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" />
        ShopHub
        <Link />
        <div className="navbar-links" className="flex-2">
          <Link to="/" className="text-green-400 me-2">Home</Link>
          <Link to="/checkout" className="navbar-link text-orange-400 ms-2">Cart</Link>
        </div>
        <div className="navbar-auth mt-2">
          <div className="navbar-auth-links">
            <Link to="/auth" className="btn">
              Login
            </Link>
            <Link to="/auth" className="btn text-green-500">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
