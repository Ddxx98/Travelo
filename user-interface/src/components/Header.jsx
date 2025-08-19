// src/components/Header.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/authActions";

const headerHeight = 64;

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - 240px)`, ml: "240px", height: headerHeight, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      {...props}
    >
      <Toolbar sx={{ height: "100%" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Travel Website
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
