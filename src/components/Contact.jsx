import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import ContactForm from "./ContactForm";
import { useTheme } from "../utils/context/useTheme";

function Contact() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen my-4 p-4 sm:px-6 lg:px-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Get in Touch
          </h1>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We'd love to hear from you. Let's create something amazing together.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 rounded-2xl shadow-xl py-4 px-8 ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          {/* Contact Information */}
          <div
            className={`space-y-8 lg:border-r ${
              darkMode ? "border-gray-700" : "border-gray-200"
            } lg:pr-8`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-full ${
                  darkMode ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <FaMapMarkerAlt
                  className={`w-6 h-6 ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Our Office
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Titus tower, Building 10
                  <br />
                  Hyderabad, 500081
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-full ${
                  darkMode ? "bg-green-900" : "bg-green-100"
                }`}
              >
                <FaPhone
                  className={`w-6 h-6 ${
                    darkMode ? "text-green-300" : "text-green-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Phone Number
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  1800-180-4567
                  <br />
                  Mon-Fri, 9am-7pm IST
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-full ${
                  darkMode ? "bg-purple-900" : "bg-purple-100"
                }`}
              >
                <FaEnvelope
                  className={`w-6 h-6 ${
                    darkMode ? "text-purple-300" : "text-purple-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Email Address
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  hello@fastfooddelivery.com
                  <br />
                  support@fastfooddelivery.com
                </p>
              </div>
            </div>

            <div
              className={`pt-8 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className={`transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-400 hover:text-blue-600"
                  }`}
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/rupesh-ranjan13/"
                  target="blank"
                  className={`transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-400 hover:text-blue-800"
                  }`}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
