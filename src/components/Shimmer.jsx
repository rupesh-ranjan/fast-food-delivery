import { useTheme } from "../utils/context/useTheme";

function Shimmer() {
  const { darkMode } = useTheme();

  const shimmerBg = darkMode ? "bg-gray-700" : "bg-gray-200";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const pageBg = darkMode ? "bg-gray-900" : "bg-gray-50";

  return (
    <div className={`p-6 min-h-screen ${pageBg}`}>
      {/* Search & Filter Shimmer */}
      <div
        className={`flex flex-col md:flex-row justify-between items-center rounded-2xl p-6 shadow-xl mb-8 gap-4 animate-pulse ${cardBg}`}
      >
        <div className="w-full md:w-1/2">
          <div className={`h-14 rounded-2xl ${shimmerBg}`}></div>
        </div>
        <div className={`h-14 w-48 rounded-2xl ${shimmerBg}`}></div>
      </div>

      {/* Restaurant Grid Shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)]?.map((_, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg overflow-hidden ${cardBg}`}
          >
            <div className={`aspect-video animate-pulse ${shimmerBg}`}></div>
            <div className="p-5 space-y-4">
              <div className={`h-6 rounded-full w-3/4 ${shimmerBg}`}></div>
              <div className={`h-4 rounded-full w-full ${shimmerBg}`}></div>
              <div className={`h-4 rounded-full w-5/6 ${shimmerBg}`}></div>
              <div className="flex justify-between items-center">
                <div className={`h-6 w-16 rounded-full ${shimmerBg}`}></div>
                <div className={`h-8 w-20 rounded-full ${shimmerBg}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shimmer;
