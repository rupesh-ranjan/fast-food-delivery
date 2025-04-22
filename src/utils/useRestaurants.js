import { useEffect, useState } from "react";
import { RESTAURANT_API } from "./constants";

export const useRestaurants = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const lat = 17.4444751;
  const lng = 78.3858388;
  useEffect(() => {
    // fetchData();
    fetch(`/.netlify/functions/swiggy-proxy?lat=${lat}&lng=${lng}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("Swiggy data:", data);
        const restaurants =
          data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        setAllRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
      });
  }, []);

  //   async function fetchData() {
  //     const data = await fetch(RESTAURANT_API);
  //     const json = await data.json();
  //     const restaurants =
  //       json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants;
  //     setAllRestaurants(restaurants);
  //     setFilteredRestaurants(restaurants);
  //   }

  return { allRestaurants, filteredRestaurants, setFilteredRestaurants };
};
