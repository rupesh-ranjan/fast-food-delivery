import { useEffect, useRef } from "react";

function Grocery() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="max-w-2xl text-center space-y-8">
        {/* Animated Construction Icon */}
        <div className="flex justify-center mb-0">
          <div className="animate-bounce bg-white p-6 rounded-full shadow-lg">
            <svg
              className="w-18 h-18 text-blue-600"
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

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Fresh Groceries Coming Soon!
          </h1>
          <p className="text-xl text-gray-600">
            We're working hard to bring you the best online grocery experience
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full animate-progress"
            style={{ width: { width } }}
          ></div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 mt-4">
            <p className="text-gray-600">
              Get notified when we launch! Enter your email:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500 w-64"
              />
              <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
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
