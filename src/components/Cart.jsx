import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import { clearCart } from "../utils/slice/cartSlice";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/context/useTheme";

function Cart() {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  const cart = useSelector((store) => store.cart);
  const { items: cartItems, totalItems, totalPrice } = cart;

  return (
    <div
      className={`mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        {cartItems.length === 0 && (
          <p className="text-lg">Your food cart is waiting to be filled!</p>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:flex-1">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleClearCart}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                🗑️ Clear Cart
              </button>
              <Link
                to="/"
                className={`px-6 py-2 rounded-lg ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white transition-colors`}
              >
                ← Continue Shopping
              </Link>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-center">
                  <div className="w-full max-w-3xl">
                    <MenuItem info={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div
            className={`lg:w-96 p-6 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between font-semibold">
                <span>Total Items </span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                className={`w-full py-3 rounded-lg ${
                  darkMode
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-green-600 hover:bg-green-700"
                } text-white font-bold transition-colors`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-md mx-auto">
          <div
            className={`p-8 rounded-xl mb-6 ${
              darkMode ? "bg-gray-800" : "bg-white shadow-md"
            }`}
          >
            <p className="text-xl mb-4">Your cart is empty</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Empty cart"
              className="w-32 h-32 mx-auto mb-6"
            />
            <Link
              to="/"
              className={`px-8 py-3 rounded-lg ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium inline-block transition-colors`}
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
