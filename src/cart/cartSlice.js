import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const initialState = {
  cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
      saveCartToLocalStorage(state.cart);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.productId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
      saveCartToLocalStorage(state.cart);
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.productId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      saveCartToLocalStorage(state.cart);
    },
    clearCart(state) {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.productId === id)?.quantity ?? 0;
