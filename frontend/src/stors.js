import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productListReducer } from "./redux/reducers/productReducers";

// Reducers
const rootReducer = combineReducers({
  productList: productListReducer,
});

// Initial State
const initialState = {};

// Middleware
const middleware = [thunk];

// Store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
