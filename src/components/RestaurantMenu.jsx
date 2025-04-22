import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";
import MenuAccordion from "./MenuAccordion";
import { FaArrowLeft } from "react-icons/fa";
import MenuShimmer from "./MenuShimmer";
import { useTheme } from "../utils/context/useTheme";

function RestaurantMenu() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const restaurantData = useRestaurantMenu(restaurantId);
  const [dietFilter, setDietFilter] = useState("all");
  const [showIndex, setShowIndex] = useState(0);

  if (!restaurantData?.cards) return <MenuShimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    areaName,
    city,
    sla,
    cloudinaryImageId,
  } = restaurantData?.cards?.[2]?.card?.card?.info || {};

  const categories =
    restaurantData?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"]?.includes("ItemCategory") &&
        c?.card?.card?.itemCards?.length > 0
    ) || [];

  const filteredCategories = categories
    ?.map((category) => {
      const originalCat = category?.card?.card;
      const filteredItemCards =
        originalCat?.itemCards?.filter((item) => {
          const info = item?.card?.info;
          if (!info) return false;
          if (dietFilter === "all") return true;
          if (dietFilter === "veg") return info?.isVeg;
          if (dietFilter === "non-veg") return !info?.isVeg;
          return true;
        }) || [];

      return { ...originalCat, itemCards: filteredItemCards };
    })
    ?.filter((cat) => cat?.itemCards?.length > 0);

  return (
    <div
      className={`max-w-4xl mx-auto p-4 min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-4 flex items-center transition-colors ${
          darkMode
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-600 hover:text-blue-800"
        }`}
      >
        <FaArrowLeft className="mr-2" />
        Back to Restaurants
      </button>

      {/* Restaurant Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 pb-4">
        <img
          src={`${RESTAURANT_IMG_CDN_URL}${cloudinaryImageId}`}
          alt={name}
          className="w-full md:w-64 h-48 object-cover rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1
            className={`text-3xl font-bold mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {name}
          </h1>
          <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {cuisines?.join(", ")}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`px-3 py-1 rounded-full ${
                avgRating >= 4
                  ? darkMode
                    ? "bg-green-900 text-green-200"
                    : "bg-green-100 text-green-800"
                  : darkMode
                    ? "bg-yellow-900 text-yellow-200"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              <span className="font-bold">{avgRating} ★</span>
              <span className="ml-2 text-sm">{totalRatingsString}</span>
            </div>
            <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
              •
            </div>
            <div className={darkMode ? "text-gray-300" : "text-gray-600"}>
              {sla?.deliveryTime} mins
            </div>
            <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
              •
            </div>
            <div
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {costForTwoMessage}
            </div>
          </div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {areaName}, {city}
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setDietFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            dietFilter === "all"
              ? darkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-600 text-white"
              : darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setDietFilter("veg")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            dietFilter === "veg"
              ? darkMode
                ? "bg-green-600 text-white"
                : "bg-green-600 text-white"
              : darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          Veg
        </button>
        <button
          onClick={() => setDietFilter("non-veg")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            dietFilter === "non-veg"
              ? darkMode
                ? "bg-red-600 text-white"
                : "bg-red-600 text-white"
              : darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          Non-Veg
        </button>
      </div>

      {filteredCategories?.length === 0 ? (
        <div
          className={`text-center py-8 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No items found matching the current filter
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCategories?.map((category, index) => (
            <MenuAccordion
              key={category?.title || index}
              category={category}
              setShowIndex={(i = index) => setShowIndex(i)}
              isOpen={index === showIndex}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantMenu;
