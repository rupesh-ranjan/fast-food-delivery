import React, { useEffect, useState } from "react";
import { MENU_API } from "./constants";

export function useRestaurantMenu(restaurantId) {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      const response = await fetch(MENU_API + restaurantId);
      const data = await response.json();
      setRestaurantData(data.data);
    };
    fetchRestaurantMenu();
  }, [restaurantId]);

  return restaurantData;
}
