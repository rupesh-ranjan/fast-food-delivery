import React from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";

function RestaurantMenu() {
  const { restaurantId } = useParams();
  const restaurantData = useRestaurantMenu(restaurantId);
  if (!restaurantData?.cards) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    restaurantData?.cards?.[2]?.card?.card?.info || null;
  const { itemCards } =
    restaurantData?.cards?.[4].groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]
      ?.card?.card || null;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines.join(", ")}</h2>
      <h2>{costForTwoMessage}</h2>
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
