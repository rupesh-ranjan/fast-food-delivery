import { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import Shimmer from "./Shimmer";

export function Body() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [showTopRated, setShowTopRated] = useState(false);
  const [searchText, setSearchText] = useState("");

  console.log("rendering body");
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4444751&lng=78.3858388&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setAllRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  }

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
            <RestaurantCard
              key={restaurant.info.id}
              restaurantData={restaurant.info}
            />
          ))
        )}
      </div>
    </div>
  );
}
