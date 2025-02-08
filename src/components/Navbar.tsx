import { Link } from "react-router-dom";
import { authService } from "../services/auth";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <Link to="/">Home</Link>
      {!authService.isAuthenticated() ? (
        <>
          <Link to="/login" className="ml-4">Login</Link>
          <Link to="/signup" className="ml-4">Sign Up</Link>
        </>
      ) : (
        <>
          <Link to="/profile" className="ml-4">Profile</Link>
          <button onClick={() => { authService.logout(); window.location.href = "/login"; }} className="ml-4">Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;