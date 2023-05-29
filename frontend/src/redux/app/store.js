import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import productSlice from "../feature/product/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productSlice,
  },
});

export default store;
