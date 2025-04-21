import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
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
      state.totalPrice += item.price || item.defaultPrice / 100 || 0;
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      console.log("Exsiting Item", existingItem);
      if (existingItem) {
        state.totalItems -= 1;
        if (existingItem.quantity === 1)
          state.items = state.items.filter((i) => i.id !== itemId);
        else existingItem.quantity -= 1;
        state.totalPrice -=
          existingItem.price || existingItem.defaultPrice / 100;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export default cartSlice.reducer;

export const { addItem, removeItem, clearCart } = cartSlice.actions;
