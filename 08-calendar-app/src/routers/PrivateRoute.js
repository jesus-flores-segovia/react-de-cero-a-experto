import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, redirectPath, isLoggedIn }) => {
  return !isLoggedIn ? <Navigate to={redirectPath} /> : children;
};
