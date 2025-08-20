// src/components/Header.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  InputBase,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/authActions";

const sidebarWidth = 240;

const Header = ({ onMenuClick, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={4}
      sx={{
        width: { sm: `calc(100% - ${sidebarWidth}px)` },
        ml: { sm: `${sidebarWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        justifyContent: "center",
        backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
      }}
      {...props}
    >
      <Toolbar sx={{ height: "100%", px: { xs: 1, sm: 3 }, display: "flex", alignItems: "center" }}>
        {/* Menu Button for Mobile */}
        {isSmDown && onMenuClick && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{
              mr: 2,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
              borderRadius: 1,
            }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo placeholder */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 700,
            letterSpacing: 3,
            userSelect: "none",
            color: "white",
            mr: 3,
          }}
        >
          Travelo
        </Typography>

        {/* Search bar */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 1,
            backgroundColor: theme.palette.common.white,
            "&:hover": { backgroundColor: theme.palette.grey[200] },
            width: { xs: "100%", sm: 300 },
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            color: "text.primary",
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{ flexGrow: 1 }}
            // You can add onChange and value props here as needed
          />
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Cart icon */}
        <IconButton
          size="large"
          color="inherit"
          aria-label="shopping cart"
          sx={{ ml: 1 }}
          onClick={() => navigate("/cart")} // change route as appropriate
        >
          <ShoppingCartIcon />
        </IconButton>

        {/* User icon */}
        <IconButton
          size="large"
          color="inherit"
          aria-label="user account"
          sx={{ ml: 1 }}
          onClick={() => navigate("/profile")}
        >
          <AccountCircleIcon />
        </IconButton>

        {/* Logout Button */}
        <Button
          color="secondary"
          variant="contained"
          size="small"
          sx={{
            ml: 2,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
