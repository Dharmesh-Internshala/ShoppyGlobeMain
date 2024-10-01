import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], 
};

// Create the cart slice with reducers
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart or increase its quantity
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    
    // Remove an item from the cart by ID
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === itemId);
      if (existingItem) {
        existingItem.quantity = newQuantity;
      }
    },

    decreaseQuantity: (state, action) => {
        const item = state.cartItems.find(item => item.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      },

    // Increase the quantity of an item in the cart by 1
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(item => item.id === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    // Get the quantity of an item by ID (typically used in selectors)
    getQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find(item => item.id === itemId);
      return item ? item.quantity : 0;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, increaseQuantity,decreaseQuantity, getQuantity } = cartSlice.actions;

export default cartSlice.reducer;
