import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Tests inside file 'authReducer.test.js'", () => {
  const initialState = {
    isLoggedIn: false,
    isCheckingLoginState: false,
  };

  test("authReducer must return the correct states", () => {
    let state = authReducer(initialState, {});
    expect(state).toEqual(initialState);

    const loginAction = {
      type: types.authLogin,
      payload: {
        uid: "622386f6da9ab1b68267734a",
        name: "Jesús",
      },
    };
    state = authReducer(initialState, loginAction);
    expect(state).toEqual({
      isLoggedIn: true,
      isCheckingLoginState: false,
      uid: "622386f6da9ab1b68267734a",
      name: "Jesús",
    });

    const checkLoginState = {
      type: types.authCheckLoginState,
      payload: {
        isCheckingLoginState: false,
      },
    };
    state = authReducer(initialState, checkLoginState);
    expect(state).toEqual({
      isLoggedIn: false,
      isCheckingLoginState: false,
    });

    const logout = {
      type: types.authLogout,
    };
    state = authReducer(initialState, logout);
    expect(state).toEqual({
      isLoggedIn: false,
      isCheckingLoginState: false,
    });
  });
});
