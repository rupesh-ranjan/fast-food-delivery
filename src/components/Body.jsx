import { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";

export function Body() {
  const [restaurantsData, setRestaurantsData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4444751&lng=78.3858388&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setRestaurantsData(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  }

  function handleClick() {
    setRestaurantsData(
      restaurantsData.filter((restaurant) => restaurant.info.avgRating > 4.5)
    );
  }
  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={handleClick}>
          Top Rated Restaurant
        </button>
      </div>
      {/* <Search /> */}
      <div className="search">Search</div>
      <div className="restaurants-container">
        {restaurantsData.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            restaurantData={restaurant.info}
          />
        ))}
      </div>
    </div>
  );
}
