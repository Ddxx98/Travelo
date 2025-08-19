// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Search", icon: <SearchIcon />, path: "/search" },
  { text: "My Bookings", icon: <BookIcon />, path: "/bookings" },
  { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
];

const Sidebar = (props) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
      {...props}
    >
      <Toolbar /> {/* Reserve space for header */}
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={path}
            selected={location.pathname === path}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
