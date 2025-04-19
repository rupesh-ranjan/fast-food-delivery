import { useState, useEffect } from "react";
import { RestaurantCard } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { useRestaurants } from "../utils/useRestaurants";

export default function Body() {
  const [showTopRated, setShowTopRated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { allRestaurants, filteredRestaurants, setFilteredRestaurants } =
    useRestaurants();

  // Real-time search and filter handling
  useEffect(() => {
    const baseResults = allRestaurants.filter((restaurant) =>
      restaurant.info.name
        .toLowerCase()
        .includes(searchText.toLowerCase().trim())
    );

    const finalResults = showTopRated
      ? baseResults.filter((restaurant) => restaurant.info.avgRating >= 4.5)
      : baseResults;

    setFilteredRestaurants(finalResults);
  }, [searchText, showTopRated, allRestaurants, setFilteredRestaurants]);

  const toggleTopRated = () => {
    setShowTopRated(!showTopRated);
  };

  const online = useOnlineStatus();
  if (!online)
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl text-red-500">
          Looks like you're offline. Please check your internet connection.
        </h1>
      </div>
    );

  if (allRestaurants.length === 0) return <Shimmer />;

  return (
    <div className="body p-4 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl p-6 shadow-lg mb-8 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-full py-3 px-6 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <button
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer min-w-40 ${
            showTopRated
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600"
          }`}
          onClick={toggleTopRated}
        >
          ⭐ {showTopRated ? "Show All" : "Top Rated"}
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRestaurants.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-2xl mb-4">
              🍴 No restaurants found!
            </div>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setSearchText("");
                setShowTopRated(false);
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <RestaurantCard restaurantData={restaurant.info} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
