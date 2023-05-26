import axios from "axios";

import * as actionTypes from "../constants/userConstants";

const API = "http://localhost:5000";

// Register User
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Send data to backend
    const { data } = await axios.post(
      `${API}/api/v1/users/register`,
      { name, email, password },
      config
    );

    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    // Save user info in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Send data to backend
    const { data } = await axios.post(
      `${API}/api/v1/users/login`,
      { email, password },
      config
    );

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save user info in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: actionTypes.USER_LOGOUT });
};

// Get User Details
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_DETAILS_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState(); // getstate() returns the whole state object from redux store

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send data to backend
    const { data } = await axios.get(`${API}/api/v1/users/${id}`, config);

    dispatch({
      type: actionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState(); // getstate() returns the whole state object from redux store

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send data to backend
    const { data } = await axios.put(
      `${API}/api/v1/users/profile`,
      user,
      config
    );
console.log(data);
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

 
    // Save user info in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
    
  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
