import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  cartItems: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.cartItems = {};
    },
    addToCart: (state, action) => {
      if (action.payload.id in state.cartItems) {
        // console.log("Already present");
        state.cartItems[action.payload.id]++;
      } else {
        // console.log("Not present");
        state.cartItems[action.payload.id] = 1;
      }
    },
    removeFromCart: (state, action) => {
      if (state.cartItems[action.payload.id] === 1) {
        delete state.cartItems[action.payload.id];
      } else {
        state.cartItems[action.payload.id]--;
      }
    },
  },
});

export const { login, logout, addToCart, removeFromCart } = authSlice.actions;

export default authSlice.reducer;
