import axios from "axios";
import * as actionTypes from "../constants/productConstants";

const API = "http://localhost:5000";

// Get all products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`${API}/api/v1/products`);

    dispatch({
      type: actionTypes.PRODUCT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
