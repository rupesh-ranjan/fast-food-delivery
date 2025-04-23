import { useState, useEffect } from "react";
import { RestaurantCard } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { useRestaurants } from "../utils/useRestaurants";
import { useTheme } from "../utils/context/useTheme";

export default function Body() {
  const { darkMode } = useTheme();
  const [showTopRated, setShowTopRated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { allRestaurants, filteredRestaurants, setFilteredRestaurants } =
    useRestaurants();

  useEffect(() => {
    const baseResults = allRestaurants?.filter((restaurant) =>
      restaurant.info.name
        .toLowerCase()
        .includes(searchText.toLowerCase().trim())
    );

    const finalResults = showTopRated
      ? baseResults?.filter((restaurant) => restaurant.info.avgRating >= 4.5)
      : baseResults;

    setFilteredRestaurants(finalResults);
  }, [searchText, showTopRated, allRestaurants, setFilteredRestaurants]);

  const toggleTopRated = () => {
    setShowTopRated(!showTopRated);
  };

  const online = useOnlineStatus();
  if (!online)
    return (
      <div
        className={`text-center py-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <h1
          className={`text-2xl ${darkMode ? "text-red-400" : "text-red-500"}`}
        >
          Looks like you're offline. Please check your internet connection.
        </h1>
      </div>
    );

  if (allRestaurants?.length === 0) return <Shimmer />;

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Search & Filter Section */}
      <div
        className={`flex flex-col md:flex-row justify-between items-center rounded-2xl p-6 shadow-xl mb-8 gap-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              className={`w-full border-2 rounded-2xl py-4 px-6 text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-900 placeholder-gray-400 text-white"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-100 placeholder-gray-400"
              }`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <button
          className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 cursor-pointer min-w-48 flex items-center justify-center gap-2 ${
            showTopRated
              ? darkMode
                ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
              : darkMode
                ? "bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-gray-600"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
          }`}
          onClick={toggleTopRated}
        >
          ⭐ {showTopRated ? "Show All" : "Top Rated"}
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredRestaurants?.length === 0 ? (
          <div
            className={`col-span-full text-center py-12 ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            <div className="text-3xl mb-6">🍽️ No restaurants found!</div>
            <button
              className={`px-6 py-2 rounded-xl transition-colors font-medium ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => {
                setSearchText("");
                setShowTopRated(false);
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredRestaurants?.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
              className="transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <RestaurantCard restaurantData={restaurant.info} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
