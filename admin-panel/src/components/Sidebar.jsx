// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const drawerWidth = 240;

const Sidebar = () => {
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Listings', icon: <HomeWorkIcon />, path: '/listings' },
    { text: 'Bookings', icon: <BookOnlineIcon />, path: '/bookings/requests' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={path}
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#1976d2' : 'transparent',
                color: isActive ? '#fff' : 'inherit',
              })}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
