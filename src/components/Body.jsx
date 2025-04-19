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
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            name=""
            id=""
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
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
        <button className="filter-btn" onClick={toggleTopRated}>
          {showTopRated ? "Show All Restaurants" : "Show Top Rated Restaurants"}
        </button>
      </div>
      <div className="restaurants-container">
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
