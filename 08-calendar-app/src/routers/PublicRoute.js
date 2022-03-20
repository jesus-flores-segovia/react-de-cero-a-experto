import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, redirectPath, isLoggedIn }) => {
  return isLoggedIn ? <Navigate to={redirectPath} /> : children;
};
