import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productReducer } from "./redux/reducers/productReducers";
import { cartReducer } from "./redux/reducers/cartReducers";

// Reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const cartItemsFromLoacalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// Initial State
const initialState = {
  cart: { cartItems: cartItemsFromLoacalStorage },
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
