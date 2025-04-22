import { useState } from "react";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { navItems } from "../utils/constants";
import { useSelector } from "react-redux";
import { useTheme } from "../utils/context/useTheme";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  const { darkMode, setDarkMode } = useTheme(); // Get theme state and setter

  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with hover effect */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8cDvKIAenhsySbKd8VM7JbxL1lViGsbDJw&s"
            alt="logo"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400 p-1"
          />
        </Link>

        {/* Navigation items */}
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
            <div
              className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <span className="text-yellow-300 text-xl">☀️</span>
            ) : (
              <span className="text-gray-700 text-xl">🌙</span>
            )}
          </button>

          <ul className="flex items-center gap-6">
            {navItems?.map(([title, url]) => (
              <li key={title}>
                <Link
                  to={url}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
                >
                  {title === "Cart" ? title + ` (${cartItems?.length})` : title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-all ${
                  isLoggedIn
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                }`}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
