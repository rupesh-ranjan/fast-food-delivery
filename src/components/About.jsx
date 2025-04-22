import useAbout from "../utils/useAbout";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useTheme } from "../utils/context/useTheme";

function About() {
  const { name, location, avatar_url } = useAbout() || {};
  const { darkMode } = useTheme();

  return (
    <div
      className={`max-w-4xl mx-auto p-8 shadow-xl rounded-3xl mt-8 transition-all duration-300 hover:shadow-2xl ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      <h1
        className={`text-5xl font-bold mb-8 text-center bg-clip-text text-transparent ${
          darkMode
            ? "bg-gradient-to-r from-blue-400 to-purple-400"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        }`}
      >
        Rupesh Ranjan
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image */}
        <div className="relative group">
          <div
            className={`w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 ${
              darkMode ? "border-gray-700" : "border-white"
            } relative z-10`}
          >
            <img
              src={avatar_url}
              alt={`Profile of ${name}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div
            className={`absolute inset-0 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-0 ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-gradient-to-r from-blue-400 to-purple-400"
            }`}
          ></div>
        </div>

        {/* Details Section */}
        <div
          className={`flex-1 space-y-6 ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {/* Personal Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-blue-100"
                }`}
              >
                <FaMapMarkerAlt
                  className={`w-6 h-6 ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                />
              </span>
              <div>
                <p
                  className={`text-xl font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Based in
                </p>
                <p
                  className={`text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-purple-100"
                }`}
              >
                <FaEnvelope
                  className={`w-6 h-6 ${
                    darkMode ? "text-purple-300" : "text-purple-600"
                  }`}
                />
              </span>
              <div>
                <p
                  className={`text-xl font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </p>
                <a
                  href="mailto:rupesh.ranjan@outlook.in"
                  className={`text-lg transition-colors ${
                    darkMode
                      ? "text-blue-300 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  rupesh.ranjan@outlook.in
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`pt-6 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-6 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Connect With Me
            </h3>
            <div className="flex gap-6">
              <a
                href="https://github.com/rupesh-ranjan"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white"
                }`}
                aria-label="GitHub"
              >
                <FaGithub
                  className={`w-8 h-8 ${
                    darkMode
                      ? "text-gray-200 hover:text-white"
                      : "text-gray-800 hover:text-black"
                  }`}
                />
              </a>

              <a
                href="https://linkedin.com/in/rupesh-ranjan13/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white"
                }`}
                aria-label="LinkedIn"
              >
                <FaLinkedin
                  className={`w-8 h-8 ${
                    darkMode
                      ? "text-blue-300 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                />
              </a>

              <a
                href="mailto:rupesh.ranjan@outlook.in"
                className={`p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white"
                }`}
                aria-label="Email"
              >
                <FaEnvelope
                  className={`w-8 h-8 ${
                    darkMode
                      ? "text-purple-300 hover:text-purple-200"
                      : "text-purple-600 hover:text-purple-800"
                  }`}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div
        className={`mt-10 text-lg leading-relaxed ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <p
          className={`border-l-4 pl-4 italic ${
            darkMode ? "border-blue-400" : "border-blue-500"
          }`}
        >
          "Passionate Frontend developer with expertise in modern web
          technologies. Dedicated to creating efficient, scalable solutions
          while staying updated with industry trends. Open to collaboration and
          exciting new projects!"
        </p>
      </div>
    </div>
  );
}

export default About;
