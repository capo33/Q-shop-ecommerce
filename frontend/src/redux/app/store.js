import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import productSlice from "../feature/product/productSlice";
import cartSlice from "../feature/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productSlice,
    cart: cartSlice,
  },
});

export default store;
