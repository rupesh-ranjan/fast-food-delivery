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

  const online = useOnlineStatus();
  if (!online)
    return (
      <h1>
        Looks like you are offline. Please check your internet connection.
      </h1>
    );
  if (allRestaurants.length === 0) return <Shimmer />;

  return (
    <div className="body my-4">
      <div className="flex justify-between items-center bg-gray-50">
        <div className="mx-4 px-4">
          <input
            type="text"
            name=""
            id=""
            className="border border-solid border-gray-800 p-2 m-2 max-w-4/5 rounded-md"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-gray-200 px-2 mx-2 rounded-md"
            onClick={() => {
              const restaurants = allRestaurants.filter((restaurant) =>
                restaurant.info.name
                  .toLowerCase()
                  .includes(searchText.trim().toLowerCase())
              );
              setFilteredRestaurants(restaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4">
          <button
            className="bg-gray-200 p-2 m-2 rounded-md"
            onClick={toggleTopRated}
          >
            {showTopRated
              ? "Show All Restaurants"
              : "Show Top Rated Restaurants"}
          </button>
        </div>
      </div>
      <div className="flex justify-between m-4 gap-4 flex-wrap">
        {filteredRestaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
            >
              <RestaurantCard
                key={restaurant.info.id}
                restaurantData={restaurant.info}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
