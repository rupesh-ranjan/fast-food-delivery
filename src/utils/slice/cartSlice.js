import { createSlice } from "@reduxjs/toolkit";

// Helper function to get correct price in rupees
const getItemPrice = (item) => {
    // If price is already in rupees (less than 1000), return as is
    if (item.price && item.price < 1000) {
        return item.price;
    }
    // If price is in paise (more than 100), convert to rupees
    if (item.price && item.price >= 100) {
        return item.price / 100;
    }
    // If defaultPrice is in paise, convert to rupees
    if (item.defaultPrice && item.defaultPrice >= 100) {
        return item.defaultPrice / 100;
    }
    // If defaultPrice is already in rupees, return as is
    if (item.defaultPrice && item.defaultPrice < 1000) {
        return item.defaultPrice;
    }
    return 0;
};

// Helper function to recalculate total
const recalculateTotal = (items) => {
    return items.reduce((total, item) => {
        return total + getItemPrice(item) * item.quantity;
    }, 0);
};

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        return savedCart
            ? JSON.parse(savedCart)
            : { items: [], totalItems: 0, totalPrice: 0 };
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return { items: [], totalItems: 0, totalPrice: 0 };
    }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCartFromStorage(),
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }

            state.totalItems += 1;
            // Recalculate total to ensure accuracy
            state.totalPrice = recalculateTotal(state.items);

            // Save to localStorage
            saveCartToStorage(state);
        },

        removeItem: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find((i) => i.id === itemId);
            if (existingItem) {
                state.totalItems -= 1;
                if (existingItem.quantity === 1) {
                    state.items = state.items?.filter((i) => i.id !== itemId);
                } else {
                    existingItem.quantity -= 1;
                }
                // Recalculate total to ensure accuracy
                state.totalPrice = recalculateTotal(state.items);

                // Save to localStorage
                saveCartToStorage(state);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;

            // Save to localStorage
            saveCartToStorage(state);
        },
    },
});

export default cartSlice.reducer;

export const { addItem, removeItem, clearCart } = cartSlice.actions;
