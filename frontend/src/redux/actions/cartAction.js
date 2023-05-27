import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

const API = "http://localhost:5000";

// 1- Add to cart action
// // getState is a function that allows us to get the entire state tree of our application
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // 1- Get the data of the product
  const { data } = await axios.get(`${API}/api/v1/products/${id}`);
  console.log(data?.data);
  // 2- Dispatch the action
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data?.data?._id,
      name: data?.data?.name,
      image: data?.data?.image,
      price: data?.data?.price,
      countInStock: data?.data?.countInStock,
      qty, // qty: qty
    },
  });

  // 3- Save the cart items to the local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// 2- Remove from cart action
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id, // payload: id
  });

  // 3- Save the cart items to the local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// 3- Save shipping address action
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // 3- Save the cart items to the local storage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
}

// 4- Save payment method action
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  // 3- Save the cart items to the local storage
  localStorage.setItem("paymentMethod", JSON.stringify(data));
}
