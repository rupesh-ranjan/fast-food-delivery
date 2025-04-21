import { useState } from "react";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { navItems } from "../utils/constants";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnlineStatus();

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with hover effect */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8cDvKIAenhsySbKd8VM7JbxL1lViGsbDJw&s"
            alt="logo"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 p-1"
          />
        </Link>

        {/* Navigation items */}
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <div
              className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-sm text-gray-600">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <ul className="flex items-center gap-6">
            {navItems.map(([title, url]) => (
              <li key={title}>
                <Link
                  to={url}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  {title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-all ${
                  isLoggedIn
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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
