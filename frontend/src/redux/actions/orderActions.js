import axios from "axios";

import * as orderConstants from "../constants/orderConstants";

const API = "http://localhost:5000";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDER_CREATE_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();
 
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { data },
    } = await axios.post(`${API}/api/v1/orders`, order, config);

    dispatch({
      type: orderConstants.ORDER_CREATE_SUCCESS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout())
      console.log("Not authorized, token failed");
    }

    dispatch({
      type: orderConstants.ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DETAILS_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${API}/api/v1/orders/${id}`, config);

    dispatch({
      type: orderConstants.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
