import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { calendarLogoutCleanEvents } from "./calendar";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithoutToken(
        "auth",
        { email, password },
        "POST"
      );
      const body = await response.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      } else {
        if (body.errors) {
          const { email, password } = body.errors;
          const message = email ? email.msg : password.msg;
          Swal.fire("Cannot login", message, "error");
          return;
        }

        Swal.fire("Cannot login", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error has occurred", "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithoutToken(
        "auth/register",
        { name, email, password },
        "POST"
      );
      const body = await response.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      } else {
        if (body.errors) {
          const { name, email, password } = body.errors;
          const message = name ? name.msg : email ? email.msg : password.msg;
          Swal.fire("Cannot register", message, "error");
          return;
        }

        Swal.fire("Cannot register", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error has occurred", "error");
    }
  };
};

export const startCheckingLoginState = () => {
  return async (dispatch) => {
    try {
      dispatch(checkLoginState({ isCheckingLoginState: true }));
      const response = await fetchWithToken("auth/newToken");
      const body = await response.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      }
      dispatch(checkLoginState({ isCheckingLoginState: false }));
    } catch (error) {
      dispatch(checkLoginState({ isCheckingLoginState: false }));
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(calendarLogoutCleanEvents());
    dispatch(logout());
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const checkLoginState = (isCheckingLoginState) => ({
  type: types.authCheckLoginState,
  payload: isCheckingLoginState,
});

const logout = () => ({
  type: types.authLogout,
});
