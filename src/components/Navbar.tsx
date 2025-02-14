import { Link, useLocation } from "react-router-dom";
import { authService } from "../services/authService";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 

  return (
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-700 bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo.jpg" className="h-16" alt="Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
            Movie Watchlist
          </span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <div className="flex space-x-4 md:order-2">
          {authService.isAuthenticated() ? (
            <button
              onClick={() => {
                authService.logout();
                window.location.href = "/login";
              }}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-400 transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col space-y-2 rounded-lg border border-gray-700 bg-gray-800 p-4 text-white md:mt-0 md:flex-row md:space-y-0 md:space-x-6 md:border-0 md:bg-transparent md:p-0">
            {authService.isAuthenticated() && (
              <li>
                <Link
                  to="/browse"
                  className={`block rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    location.pathname === "/browse"
                      ? "text-red-500 font-semibold"
                      : "hover:bg-gray-700 hover:text-white md:bg-transparent md:hover:bg-transparent md:hover:text-red-500"
                  }`}
                >
                  My Movie List
                </Link>
              </li>
            )}

            {authService.isAuthenticated() && (
              <li>
                <Link
                  to="/profile"
                  className={`block rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    location.pathname === "/profile"
                      ? "text-red-500 font-semibold"
                      : "hover:bg-gray-700 hover:text-white md:bg-transparent md:hover:bg-transparent md:hover:text-red-500"
                  }`}
                >
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

