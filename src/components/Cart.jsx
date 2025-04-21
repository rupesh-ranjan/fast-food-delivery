import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import { clearCart } from "../utils/slice/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  const cart = useSelector((store) => store.cart);
  const { items: cartItems, totalItems, totalPrice } = cart;
  console.log(cartItems);
  return (
    <div className="m-4 p-4 text-center border-t">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <>
          <button
            className="p-2 m-2 bg-gray-500 text-white rounded-2xl"
            onClick={handleClearCart}
          >
            Clear cart
          </button>
          <div className="items-center mt-5">
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="mb-0 px-50">
              <MenuItem info={item} />
            </div>
          ))}
          <div className="flex justify-between text-center w-9/12 mx-auto mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <span>Total ({totalItems} Items)</span>
            <span>₹{totalPrice}</span>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p>Your cart is empty...</p>
          <div className="items-center mt-5">
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Ordering
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
