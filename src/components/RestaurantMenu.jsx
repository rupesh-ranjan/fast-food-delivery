import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

function RestaurantMenu() {
  const [restaurantData, setRestaurantData] = useState(null);
  const { restaurantId } = useParams();
  restaurantId;
  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      const response = await fetch(MENU_API + restaurantId);
      const data = await response.json();
      // console.log(data.data);
      setRestaurantData(data.data);
    };
    fetchRestaurantMenu();
  }, [restaurantId]);

  if (!restaurantData?.cards) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    restaurantData?.cards?.[2]?.card?.card?.info || null;
  const { itemCards } =
    restaurantData?.cards?.[4].groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]
      ?.card?.card || null;
  // console.log(itemCards);

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines.join(", ")}</h2>
      <h2>{costForTwoMessage}</h2>
      {/* <h2>{cloudinaryImageId}</h2> */}
      <ul>
        {itemCards?.map(({ card }) => {
          const { id, name, price, defaultPrice } = card.info;
          const finalPrice = (price || defaultPrice) / 100;

          return (
            <li key={id}>
              {name}, Price: ₹{finalPrice}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RestaurantMenu;
