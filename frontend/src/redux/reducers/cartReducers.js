import * as types from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

// Add to cart
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CART_ADD_ITEM:
      const item = action.payload;

      // Check if item is already in cart
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      // If item is already in cart, update quantity
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          ),
        };
      } else {
        // If item is not in cart, add item to cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case types.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case types.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
