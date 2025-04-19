import React, { useState } from "react";
import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";

const MenuAccordion = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Safe access with optional chaining
  const itemCards = category?.itemCards || [];
  const title = category?.title || "Menu Category";
  const count = itemCards.length;

  return (
    <div className="border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {title} {count > 0 ? `(${count})` : ""}
        </h3>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </div>

      {isOpen && (
        <div className="p-4 border-t">
          {itemCards.length > 0 ? (
            itemCards.map((item) => {
              const info = item?.card?.info || {};
              const finalPrice = (info.price || info.defaultPrice) / 100 || 0;

              return (
                <div
                  key={info.id}
                  className="flex gap-4 py-4 border-b last:border-0"
                >
                  {info.imageId && (
                    <img
                      src={`${RESTAURANT_IMG_CDN_URL}${info.imageId}`}
                      alt={info.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-800">{info.name}</h4>
                      {info.isVeg ? (
                        <span className="text-green-600 text-lg">🟢</span>
                      ) : (
                        <span className="text-red-600 text-lg">🔴</span>
                      )}
                    </div>
                    {info.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {info.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-medium">
                        ₹{finalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-center py-4">
              No items available in this category
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuAccordion;
