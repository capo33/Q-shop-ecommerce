import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./redux/reducers/userReducer";
import { cartReducer } from "./redux/reducers/cartReducers";
import { productReducer } from "./redux/reducers/productReducers";
import { orderCreateReducer ,orderDetailsReducer} from "./redux/reducers/orderReducers";

// Reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

const cartItemsFromLoacalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromLoacalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromLoacalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLoacalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

// Initial State
const initialState = {
  cart: {
    cartItems: cartItemsFromLoacalStorage,
    shippingAddress: shippingAddressFromLoacalStorage,
    paymentMethod: paymentMethodFromLoacalStorage,
  },
  user: { userInfo: userInfoFromLoacalStorage },
};

// Middleware
const middleware = [thunk];

// Store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
