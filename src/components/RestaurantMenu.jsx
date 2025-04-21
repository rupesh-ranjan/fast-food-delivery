import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams, useNavigate } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";
import MenuAccordion from "./MenuAccordion";
import { FaArrowLeft } from "react-icons/fa";

function RestaurantMenu() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const restaurantData = useRestaurantMenu(restaurantId);
  const [dietFilter, setDietFilter] = useState("all"); // Step 1: Add filter state
  const [showIndex, setShowIndex] = useState(0); // State to manage which accordion is open

  if (!restaurantData?.cards) return <Shimmer />;

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

  // Step 3: Filter categories based on diet preference
  console.log("Rstaurant Data:", restaurantData);
  console.log("Filtered Categories:", categories);
  const filteredCategories = categories
    .map((category) => {
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
    .filter((cat) => cat?.itemCards?.length > 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
          <p className="text-gray-600 mb-2">{cuisines?.join(", ")}</p>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`px-3 py-1 rounded-full ${avgRating >= 4 ? "bg-green-100" : "bg-yellow-100"}`}
            >
              <span className="font-bold">{avgRating} ★</span>
              <span className="ml-2 text-sm">{totalRatingsString}</span>
            </div>
            <div className="text-gray-600">•</div>
            <div className="text-gray-600">{sla?.deliveryTime} mins</div>
            <div className="text-gray-600">•</div>
            <div className="font-medium">{costForTwoMessage}</div>
          </div>
          <p className="text-gray-500 text-sm">
            {areaName}, {city}
          </p>
        </div>
      </div>

      {/* Step 2: Add filter buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setDietFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            dietFilter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setDietFilter("veg")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            dietFilter === "veg"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Veg
        </button>
        <button
          onClick={() => setDietFilter("non-veg")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            dietFilter === "non-veg"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Non-Veg
        </button>
      </div>

      {/* Step 4: Handle empty state */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No items found matching the current filter
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCategories.map((category, index) => (
            <MenuAccordion
              key={category?.title || index}
              category={category}
              setShowIndex={() => setShowIndex(index)}
              isOpen={index === showIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantMenu;
