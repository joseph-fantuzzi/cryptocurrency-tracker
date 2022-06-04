import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
