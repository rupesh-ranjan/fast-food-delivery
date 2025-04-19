import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";

export function RestaurantCard({ restaurantData }) {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    restaurantData;

  return (
    <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`${RESTAURANT_IMG_CDN_URL}${cloudinaryImageId}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          ⏱️ {sla?.deliveryTime} mins
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {name}
        </h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {cuisines.join(", ")}
        </p>

        <div className="flex justify-between items-center">
          <div
            className={`flex items-center ${
              avgRating >= 4.0 ? "text-green-600" : "text-yellow-600"
            }`}
          >
            <span className="text-lg font-bold">{avgRating}</span>
            <span className="ml-1">★</span>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Avg. Cost</div>
            <div className="font-semibold text-gray-700">{costForTwo}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
