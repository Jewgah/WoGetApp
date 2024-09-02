import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/Api/Controllers/AuthService";

export const ProtectedRoute = ({ redirectPath = "/auth/login", children }) => {
  if (!AuthService.isLogged()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
