import * as types from '../constants/userConstants';

const initialState = {
  userInfo: {},
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.USER_REGISTER_SUCCESS:
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case types.USER_REGISTER_FAIL:
    case types.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}

const userDetailsInitialState = {
  user: {},
  loading: false,
  error: null,
};

export const userDetailsReducer = (state = userDetailsInitialState, action) => {
  switch (action.type) {
    case types.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const userUpdateProfileInitialState = {
  userInfo: {},
  loading: false,
  error: null,
  success: false,
};

export const userUpdateProfileReducer = (state = userUpdateProfileInitialState, action) => {
  switch (action.type) {
    case types.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case types.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.USER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        userInfo: {},
        loading: false,
        error: null,
        success: false,
      };
    default:
      return state;
  }
}