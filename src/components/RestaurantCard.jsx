import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";

export function RestaurantCard({ restaurantData }) {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    restaurantData;
  return (
    <div className="max-w-70 bg-gray-300 hover:bg-gray-400 rounded-2xl p-2 min-h-135">
      <img
        src={`${RESTAURANT_IMG_CDN_URL}${cloudinaryImageId}`}
        alt="restaurant-card-logo"
        className="rounded-2xl min-h-77"
      />
      <div className="my-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <h4>{cuisines.join(", ")}</h4>
        <div className="flex justify-between my-2 font-bold">
          <h4>Rating: {avgRating} 🌟</h4>
          <h4>{costForTwo}</h4>
        </div>
        <h4>Deliver in: {sla?.deliveryTime} minute</h4>
      </div>
    </div>
  );
}
