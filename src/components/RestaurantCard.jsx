import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";
import { useTheme } from "../utils/context/useTheme";

export function RestaurantCard({ restaurantData }) {
  const { darkMode } = useTheme();

  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    restaurantData;

  return (
    <div
      className={`h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
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

      <div className="flex flex-col justify-between p-5">
        <div className="flex justify-between items-start mb-3">
          <h2
            className={`text-xl font-bold truncate pr-2 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {name}
          </h2>
          <div
            className={`flex items-center px-3 py-1 rounded-full text-sm ${
              darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            ⏱️{" "}
            <span className="ml-1 font-medium min-w-18">{sla?.slaString}</span>
          </div>
        </div>

        <p
          className={`text-sm mb-4 line-clamp-2 italic ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {cuisines.join(", ")}
        </p>

        <div className="flex justify-between items-center">
          <div
            className={`flex items-center px-3 py-1 rounded-full ${
              avgRating >= 4.0
                ? darkMode
                  ? "bg-green-900 text-green-200"
                  : "bg-green-100 text-green-800"
                : darkMode
                  ? "bg-yellow-900 text-yellow-200"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <span className="font-bold text-lg">{avgRating}</span>
            <span className="ml-1">★</span>
          </div>

          <div className="text-right">
            <div
              className={`text-xs font-semibold uppercase tracking-wide ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Avg. Cost
            </div>
            <div
              className={`text-lg font-bold ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {costForTwo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
