import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a cart item
interface CartItem {
  id: string;
  asin: string;
  product_title: string;
  product_price: string;
  product_photo: string;
  quantity: number;
}

// Initial state of the cart, with an empty array of cart items
const initialState: { cartItems: CartItem[] } = {
  cartItems: [],
};

// Create the shopping slice with reducers to manage cart actions
export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    // Action to add a product to the cart or update its quantity if already present
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Find the index of the product in the cart
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // If the product is already in the cart, update its quantity
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity;
      } else {
        // Otherwise, add the new product to the cart
        state.cartItems.push({ ...action.payload });
      }
    },

    // Action to update the quantity of a specific product in the cart
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      // Find the index of the product in the cart
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // If the product is in the cart, update its quantity
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity;
      }
    },

    // Action to remove a product from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Filter out the product with the matching id
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

// Export actions to be used in components
export const { addToCart, updateCartQuantity, removeFromCart } =
  shoppingSlice.actions;

// Export the reducer to be used in the store configuration
export default shoppingSlice.reducer;
