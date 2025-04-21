// Body.jsx
import { useState, useEffect } from "react";
import { RestaurantCard } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { useRestaurants } from "../utils/useRestaurants";
import { withLabelRestaurant } from "./RestaurantCard";

export default function Body() {
  const [showTopRated, setShowTopRated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { allRestaurants, filteredRestaurants, setFilteredRestaurants } =
    useRestaurants();
  const RestaurantCardPromoted = withLabelRestaurant(RestaurantCard);
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
    <div className="body p-6 min-h-screen bg-gray-50">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl p-6 shadow-xl mb-8 gap-4">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-2xl py-4 px-6 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 placeholder-gray-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <button
          className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 cursor-pointer min-w-48 flex items-center justify-center gap-2 ${
            showTopRated
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
          }`}
          onClick={toggleTopRated}
        >
          ⭐ {showTopRated ? "Show All" : "Top Rated"}
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredRestaurants.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-3xl mb-6">
              🍽️ No restaurants found!
            </div>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
              onClick={() => {
                setSearchText("");
                setShowTopRated(false);
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
              className="transform transition-transform duration-300 hover:scale-[1.02]"
            >
              {restaurant.info.promoted ? (
                // {/* {true ? ( */}
                <RestaurantCardPromoted restaurantData={restaurant.info} />
              ) : (
                <RestaurantCard restaurantData={restaurant.info} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
