import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { startCheckingLoginState } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isCheckingLoginState } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(startCheckingLoginState());
  }, [dispatch]);

  if (isCheckingLoginState) {
    return <h1>Checking</h1>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn} redirectPath={"login"}>
            <CalendarScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="login"
        element={
          <PublicRoute isLoggedIn={isLoggedIn} redirectPath={"/"}>
            <LoginScreen />
          </PublicRoute>
        }
      />
      <Route path="login" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
