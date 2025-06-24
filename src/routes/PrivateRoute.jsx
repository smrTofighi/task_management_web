import React, { useContext } from "react";
import { Navigate, Outlet, } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
};
