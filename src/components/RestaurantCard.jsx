export function RestaurantCard({ restaurantData }) {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    restaurantData;
  return (
    <div className="restaurant-card">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt="restaurant-card-logo"
        className="restaurant-logo"
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.deliveryTime} mins</h4>
    </div>
  );
}
