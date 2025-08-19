// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { verifyToken, logout } from "../store/actions/authActions";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken(token))
        .unwrap()
        .then(() => {
          setCheckingToken(false);
          // If user is on login or register page while authenticated, redirect to /home
          if (location.pathname === "/login" || location.pathname === "/register") {
            navigate("/home", { replace: true });
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(logout());
          setCheckingToken(false);
        });
    } else {
      setCheckingToken(false);
    }
  }, [dispatch, location.pathname, navigate]);

  if (loading || checkingToken) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
