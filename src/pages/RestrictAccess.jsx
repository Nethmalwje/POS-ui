import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserData } from "../context/userContext";

function RestrictAccess({ children, allowedRoles }) {
  const { user } = useUserData();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
}
export default RestrictAccess;
