import { useDispatch, useSelector } from "react-redux";
import { RESTAURANT_IMG_CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/slice/cartSlice";

function MenuItem({ info }) {
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
    <div className="flex gap-4 py-4 border-b last:border-0">
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
          <span className="font-medium">₹{finalPrice.toLocaleString()}</span>
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
          className={`flex gap-2 p-0.5 my-0.5 px-2 bg-green-400 rounded-2xl ${itemQuantity === 0 ? "justify-center" : "justify-between"}`}
        >
          {itemQuantity === 0 ? null : (
            <button onClick={() => handleRemoveItem(info)}>➖</button>
          )}
          {itemQuantity === 0 ? (
            <button onClick={() => handleAddItem(info)}>{"ADD"}</button>
          ) : (
            <span className="font-semibold">{itemQuantity}</span>
          )}
          {itemQuantity === 0 ? null : (
            <button onClick={() => handleAddItem(info)}>➕</button>
          )}
        </div>
      </div>
    </div>
  );
}
export default MenuItem;
