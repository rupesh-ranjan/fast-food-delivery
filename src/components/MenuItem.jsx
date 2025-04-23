import { useDispatch, useSelector } from "react-redux";
import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/slice/cartSlice";
import { useTheme } from "../utils/context/useTheme";

function MenuItem({ info }) {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  function handleAddItem(item) {
    dispatch(addItem(item));
  }
  function handleRemoveItem(item) {
    dispatch(removeItem(item.id));
  }
  const finalPrice = (info.price || info.defaultPrice) / 100 || 0;
  const cartItem =
    useSelector((store) =>
      store.cart.items.find((item) => item.id === info.id)
    ) || {};

  const itemQuantity = cartItem.quantity || 0;

  return (
    <div
      data-testid="menuItem"
      className={`flex gap-4 py-4 ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } border-b last:border-0`}
    >
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4
            className={`font-medium ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {info.name}
          </h4>
          {info.isVeg ? (
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              <span className="text-xs text-green-600">Veg</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span className="text-xs text-red-600">Non-Veg</span>
            </div>
          )}
        </div>
        {info.description && (
          <p
            className={`text-sm mt-1 line-clamp-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {info.description}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span
            className={`font-medium ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            ₹{finalPrice.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {info.imageId && (
          <img
            src={`${RESTAURANT_IMG_CDN_URL}${info.imageId}`}
            alt={info.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        )}

        <div
          className={`flex gap-2 p-0.5 my-0.5 px-2 rounded-2xl ${
            itemQuantity === 0
              ? "justify-center bg-green-500 hover:bg-green-600"
              : "justify-between bg-green-600"
          } transition-colors`}
        >
          {itemQuantity === 0 ? (
            <button
              onClick={() => handleAddItem(info)}
              className="text-white font-medium cursor-pointer w-full"
            >
              ADD
            </button>
          ) : (
            <>
              <button
                onClick={() => handleRemoveItem(info)}
                className="text-white cursor-pointer"
              >
                ➖
              </button>
              <span className="font-semibold text-white">{itemQuantity}</span>

              <button
                onClick={() => handleAddItem(info)}
                className="text-white cursor-pointer"
              >
                ➕
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
