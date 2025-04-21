// RestaurantCard.jsx
import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";

export function RestaurantCard({ restaurantData }) {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    restaurantData;

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`${RESTAURANT_IMG_CDN_URL}${cloudinaryImageId}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {restaurantData?.aggregatedDiscountInfoV3?.header && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-bold text-xl drop-shadow-md">
              {restaurantData.aggregatedDiscountInfoV3.header}{" "}
              {restaurantData.aggregatedDiscountInfoV3.subHeader}
            </p>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-gray-800 truncate pr-2">
            {name}
          </h2>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
            ⏱️ <span className="ml-1 font-medium">{sla?.slaString}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">
          {cuisines.join(", ")}
        </p>

        <div className="flex justify-between items-center">
          <div
            className={`flex items-center px-3 py-1 rounded-full ${
              avgRating >= 4.0
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <span className="font-bold text-lg">{avgRating}</span>
            <span className="ml-1">★</span>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Avg. Cost
            </div>
            <div className="text-lg font-bold text-gray-800">{costForTwo}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function withLabelRestaurant(RestaurantCard) {
  return function (props) {
    return (
      <div className="relative">
        <div className="absolute top-0 left-0 z-10 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-1 overflow-hidden text-sm font-bold shadow-md">
          Promoted
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
}
