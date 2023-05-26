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

// Reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromLoacalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromLoacalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial State
const initialState = {
  cart: { cartItems: cartItemsFromLoacalStorage },
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
