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