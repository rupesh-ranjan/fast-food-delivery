import useAbout from "../utils/useAbout";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function About() {
  const { name, location, avatar_url } = useAbout() || {};

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl rounded-3xl mt-8 transition-all duration-300 hover:shadow-2xl">
      <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Rupesh Ranjan
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image with Decorative Elements */}
        <div className="relative group">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-white relative z-10">
            <img
              src={avatar_url}
              alt={`Profile of ${name}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-0"></div>
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-6 text-gray-800">
          {/* Personal Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-blue-100 rounded-lg">
                <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
              </span>
              <div>
                <p className="text-xl font-semibold text-gray-700">Based in</p>
                <p className="text-lg text-gray-600">{location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="p-2 bg-purple-100 rounded-lg">
                <FaEnvelope className="w-6 h-6 text-purple-600" />
              </span>
              <div>
                <p className="text-xl font-semibold text-gray-700">Email</p>
                <a
                  href="mailto:rupesh.ranjan@outlook.in"
                  className="text-lg text-blue-600 hover:text-blue-800 transition-colors"
                >
                  rupesh.ranjan@outlook.in
                </a>
              </div>
            </div>
          </div>

          {/* Social Links with Improved Design */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              Connect With Me
            </h3>
            <div className="flex gap-6">
              <a
                href="https://github.com/rupesh-ranjan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub className="w-8 h-8 text-gray-800 hover:text-black" />
              </a>

              <a
                href="https://linkedin.com/in/rupesh-ranjan13/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-8 h-8 text-blue-600 hover:text-blue-800" />
              </a>

              <a
                href="mailto:rupesh.ranjan@outlook.in"
                className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <FaEnvelope className="w-8 h-8 text-purple-600 hover:text-purple-800" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add a brief bio section */}
      <div className="mt-10 text-lg text-gray-600 leading-relaxed">
        <p className="border-l-4 border-blue-500 pl-4 italic">
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
