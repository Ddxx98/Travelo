import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken, logout } from "../store/actions/authActions";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(verifyToken(token))
        .unwrap()
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(logout());
          navigate("/login", { replace: true, state: { from: location } });
        });
    } else {
      navigate("/login", { replace: true, state: { from: location } });
    }
    // eslint-disable-next-line
  }, [dispatch, navigate, location]);

  if (loading) {
    // You can replace with a spinner or splash screen here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If verification not done yet or failed, don't render children
    return null;
  }

  // Render protected children if authenticated
  return children;
};

export default ProtectedRoute;
