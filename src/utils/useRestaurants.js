import { useEffect, useState } from "react";
import { RESTAURANT_API } from "./constants";

export const useRestaurants = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch(RESTAURANT_API);
    const json = await data.json();
    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setAllRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  }

  return { allRestaurants, filteredRestaurants, setFilteredRestaurants };
};
