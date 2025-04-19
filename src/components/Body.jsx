import { useState } from "react";
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

  function toggleTopRated() {
    if (showTopRated) {
      setFilteredRestaurants(allRestaurants);
    } else {
      setFilteredRestaurants(
        filteredRestaurants.filter(
          (restaurant) => restaurant.info.avgRating >= 4.4
        )
      );
    }
    setShowTopRated(!showTopRated);
  }

  function handleSearch() {
    const restaurants = allRestaurants.filter((restaurant) =>
      restaurant.info.name
        .toLowerCase()
        .includes(searchText.trim().toLowerCase())
    );
    setFilteredRestaurants(restaurants);
  }

  const online = useOnlineStatus();
  if (!online)
    return (
      <h1>
        Looks like you are offline. Please check your internet connection.
      </h1>
    );
  console.log("allRestaurants", allRestaurants);
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
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 cursor-pointer transition-colors duration-300 shadow-md"
              onClick={handleSearch}
            >
              Search
            </button>
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
                setFilteredRestaurants(allRestaurants);
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
