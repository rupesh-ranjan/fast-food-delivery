import { FaPaperPlane } from "react-icons/fa";

export default function ContactForm({ darkMode }) {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first-name"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            First name
          </label>
          <input
            type="text"
            id="first-name"
            className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "border-gray-300"
            }`}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="last-name"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Last name
          </label>
          <input
            type="text"
            id="last-name"
            className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "border-gray-300"
            }`}
            placeholder="Last Name"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className={`block text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "border-gray-300"
          }`}
          placeholder="name@example.com"
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className={`block text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Message
        </label>
        <textarea
          id="message"
          rows="4"
          className={`mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "border-gray-300"
          }`}
          placeholder="How can we help you?"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700"
            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        }`}
      >
        <FaPaperPlane className="w-5 h-5 mr-2" />
        Send Message
      </button>
    </form>
  );
}
