import { useEffect, useState } from "react";
import { RESTAURANT_API } from "./constants";

export const useRestaurants = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(RESTAURANT_API);
    const data = await response.json();
    const restaurants =
      data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setAllRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  }

  return { allRestaurants, filteredRestaurants, setFilteredRestaurants };
};
