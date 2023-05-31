import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import cartService from "./cartServices";

// Get cart items from local storage if it exists
const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems"));

const initialState = {
  cartItems:   [],
  shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) || {},
  paymentMethod: JSON.parse(localStorage.getItem("paymentMethod")) || '',
  loading: false,
  error: null,
};

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, qty }, thunkAPI) => {
    try {
      const response = await cartService.addToCart(id, qty);
      console.log("response: ", response);
       return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(id);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Save shipping address
export const saveShippingAddress = createAsyncThunk(
  "cart/saveShippingAddress",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await cartService.saveShippingAddress(data);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Save payment method
export const savePaymentMethod = createAsyncThunk(
  "cart/savePaymentMethod",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await cartService.savePaymentMethod(data);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = {};
      state.paymentMethod = {};
    },
  },
  extraReducers: (builder) => {
    // Add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        const existItem = state.cartItems.find((x) => x.product === payload.product);

        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product ? payload : x
          );
        } else {
          state.cartItems = [...state.cartItems, payload];
        }
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cartItems = payload;
      })
      .addCase(removeFromCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Save shipping address
      .addCase(saveShippingAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveShippingAddress.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.shippingAddress = payload;
      })
      .addCase(saveShippingAddress.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Save payment method
      .addCase(savePaymentMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePaymentMethod.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.paymentMethod = payload;
      })
      .addCase(savePaymentMethod.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;