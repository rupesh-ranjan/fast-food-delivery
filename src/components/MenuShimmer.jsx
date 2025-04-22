import { useTheme } from "../utils/context/useTheme";

export const MenuShimmer = ({ type = "menu" }) => {
  const { darkMode } = useTheme();

  // Base shimmer style
  const shimmerBase = `animate-pulse rounded-lg ${
    darkMode ? "bg-gray-700" : "bg-gray-200"
  }`;

  // Menu Page Shimmer
  if (type === "menu") {
    return (
      <div
        className={`max-w-4xl mx-auto p-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        {/* Back Button Shimmer */}
        <div className={`h-6 w-24 mb-6 ${shimmerBase}`}></div>

        {/* Restaurant Header Shimmer */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className={`w-full md:w-64 h-48 ${shimmerBase}`}></div>
          <div className="flex-1 space-y-4">
            <div className={`h-8 w-3/4 ${shimmerBase}`}></div>
            <div className={`h-4 w-full ${shimmerBase}`}></div>
            <div className="flex gap-4">
              <div className={`h-6 w-16 ${shimmerBase}`}></div>
              <div className={`h-6 w-24 ${shimmerBase}`}></div>
              <div className={`h-6 w-32 ${shimmerBase}`}></div>
            </div>
            <div className={`h-4 w-1/2 ${shimmerBase}`}></div>
          </div>
        </div>

        {/* Filter Buttons Shimmer */}
        <div className="flex gap-3 mb-6">
          <div className={`h-8 w-16 ${shimmerBase}`}></div>
          <div className={`h-8 w-16 ${shimmerBase}`}></div>
          <div className={`h-8 w-20 ${shimmerBase}`}></div>
        </div>

        {/* Menu Categories Shimmer */}
        <div className="space-y-4">
          {[...Array(5)]?.map((_, i) => (
            <div key={i} className={`h-16 ${shimmerBase}`}></div>
          ))}
        </div>
      </div>
    );
  }

  // Menu Accordion Shimmer
  if (type === "accordion") {
    return (
      <div
        className={`border rounded-xl shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className={`h-16 ${shimmerBase}`}></div>
      </div>
    );
  }

  // Menu Item Shimmer
  if (type === "item") {
    return (
      <div
        className={`flex gap-4 py-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex-1 space-y-3">
          <div className={`h-5 w-3/4 ${shimmerBase}`}></div>
          <div className={`h-4 w-full ${shimmerBase}`}></div>
          <div className={`h-5 w-1/4 ${shimmerBase}`}></div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className={`w-24 h-24 ${shimmerBase}`}></div>
          <div className={`h-8 w-16 ${shimmerBase}`}></div>
        </div>
      </div>
    );
  }

  // Default Shimmer (can be used for other components)
  return (
    <div className={`w-full ${shimmerBase}`} style={{ height: "100px" }}></div>
  );
};

export default MenuShimmer;
