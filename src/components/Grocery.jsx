import { useEffect, useRef } from "react";
import { useTheme } from "../utils/context/useTheme";

function Grocery() {
  const { darkMode } = useTheme();
  const width = useRef(0);

  useEffect(() => {
    const progressBar = document.querySelector(".animate-progress");
    const interval = setInterval(() => {
      if (width.current >= 100) {
        width.current = 0;
      } else {
        width.current++;
        progressBar.style.width = width.current + "%";
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      <div className="max-w-2xl text-center space-y-8">
        {/* Animated Construction Icon */}
        <div className="flex justify-center mb-0">
          <div
            className={`animate-bounce p-6 rounded-full shadow-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <svg
              className="w-18 h-18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        <div className="p-2 space-y-4">
          <h1
            className={`text-4xl md:text-5xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Fresh Groceries Coming Soon!
          </h1>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We're working hard to bring you the best online grocery experience
          </p>
        </div>

        {/* Progress Indicator */}
        <div
          className={`mx-6 w-10/12 sm:w-full rounded-full h-4 ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-4 rounded-full animate-progress ${
              darkMode ? "bg-blue-400" : "bg-blue-600"
            }`}
            style={{ width: { width } }}
          ></div>
        </div>

        <div className="space-y-6 m-6">
          <div className="space-y-4 mt-4">
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Get notified when we launch! Enter your email:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full sm:w-8/12 px-6 py-3 border-2 rounded-full focus:outline-none transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                    : "border-blue-200 focus:border-blue-500"
                }`}
              />
              <button
                className={`px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium ${
                  darkMode
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-600 text-white"
                }`}
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grocery;
