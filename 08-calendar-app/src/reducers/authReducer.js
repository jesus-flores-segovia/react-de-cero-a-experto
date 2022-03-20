import { types } from "../types/types";

const initialState = {
  isLoggedIn: false,
  isCheckingLoginState: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };
    case types.authRegister:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };
    case types.authCheckLoginState:
      return {
        ...state,
        ...action.payload,
      };
    case types.authLogout:
      return {
        isLoggedIn: false,
        isCheckingLoginState: false,
      };
    default:
      return state;
  }
};
