import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { navItems } from "../utils/constants";
import { useSelector } from "react-redux";
import { useTheme } from "../utils/context/useTheme";
import { FiMenu, FiX } from "react-icons/fi";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOnline = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Mobile Menu Button */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8cDvKIAenhsySbKd8VM7JbxL1lViGsbDJw&s"
                alt="logo"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400 p-1"
              />
            </Link>
          </div>
          <div className="flex justify-between items-center gap-4">
            {mobileMenuOpen === true ? null : (
              <OnlineStatusIndicator isOnline={isOnline} darkMode={darkMode} />
            )}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            {mobileMenuOpen && (
              <LoginButton
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                darkMode={darkMode}
                mobile
              />
            )}
          </div>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationLinks
            navItems={navItems}
            isActive={isActive}
            cartItems={cartItems}
            darkMode={darkMode}
          />
          <LoginButton
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            darkMode={darkMode}
          />
        </nav>
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 mt-[4.5rem]">
            {/* Fixed: Adjusted z-index and margin */}
            <div
              className={`p-6 w-1/2 h-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
            >
              <div className="flex flex-col items-center gap-6">
                <OnlineStatusIndicator
                  isOnline={isOnline}
                  darkMode={darkMode}
                />

                <NavigationLinks
                  navItems={navItems}
                  isActive={isActive}
                  cartItems={cartItems}
                  darkMode={darkMode}
                  mobile
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Sub-components with all required props
const OnlineStatusIndicator = ({ isOnline, darkMode }) => (
  <div
    className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${
      darkMode ? "bg-gray-700" : "bg-gray-100"
    }`}
  >
    <div
      className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
    ></div>
    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
      {isOnline ? "Online" : "Offline"}
    </span>
  </div>
);

const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <button
    onClick={() => setDarkMode(!darkMode)}
    className={`relative w-16 h-7 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
      darkMode ? "bg-gray-700" : "bg-gray-200"
    }`}
    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
  >
    <div
      className={`absolute inset-0 rounded-full transition-opacity ${
        darkMode ? "bg-blue-500 opacity-10" : "bg-blue-400 opacity-5"
      }`}
    ></div>
    <div
      className={`relative w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
        darkMode
          ? "translate-x-[2.25rem] bg-yellow-300 shadow-yellow-200/30" // Fixed: Adjusted translate value
          : "translate-x-0 bg-white shadow-gray-400/20"
      }`}
    >
      {darkMode ? (
        <svg
          className="w-4 h-4 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </div>
  </button>
);

const NavigationLinks = ({
  navItems,
  isActive,
  cartItems,
  mobile = false,
  setMobileMenuOpen,
}) => (
  <ul className={`flex ${mobile ? "flex-col gap-4" : "items-center gap-6"}`}>
    {navItems?.map(([title, url]) => (
      <li key={title}>
        <Link
          to={url}
          className={`font-medium transition-colors relative group ${
            isActive(url)
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : `text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${mobile ? "block py-2" : ""}`
          }`}
          onClick={() => mobile && setMobileMenuOpen(false)}
        >
          {title === "Cart" ? `${title} (${cartItems?.length})` : title}
          <span
            className={`absolute -bottom-1 left-0 h-0.5 transition-all ${
              isActive(url)
                ? "w-full bg-blue-600 dark:bg-blue-400"
                : "w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full"
            }`}
          ></span>
        </Link>
      </li>
    ))}
  </ul>
);

const LoginButton = ({ isLoggedIn, setIsLoggedIn, mobile = false }) => (
  <button
    onClick={() => setIsLoggedIn(!isLoggedIn)}
    className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-all ${
      isLoggedIn
        ? `bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 ${mobile ? "w-full" : ""}`
        : `bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 ${mobile ? "w-full" : ""}`
    }`}
  >
    {isLoggedIn ? "Logout" : "Login"}
  </button>
);
