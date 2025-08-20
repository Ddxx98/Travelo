// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import CategoriesList from "./pages/Categories/CategoriesList";
import AddCategory from "./pages/Categories/AddCategory";
import EditCategory from "./pages/Categories/EditCategory";
import ListingsList from "./pages/Listings/ListingsList";
import AddListing from "./pages/Listings/AddListing";
import EditListing from "./pages/Listings/EditListing";
import BookingRequests from "./pages/Bookings/BookingRequests";
import BookingHistory from "./pages/Bookings/BookingHistory";

import { Box, useMediaQuery, useTheme, Drawer } from "@mui/material";

const drawerWidth = 240;

const App = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerProps = {
    sx: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
    },
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              {isSmDown ? (
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{ keepMounted: true }} // improve mobile performance
                  {...drawerProps}
                >
                  <Sidebar onLinkClick={handleDrawerToggle} />
                </Drawer>
              ) : (
                <Sidebar {...drawerProps} />
              )}

              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: "100vh",
                  overflow: "hidden",
                }}
              >
                <Header onMenuClick={handleDrawerToggle} />

                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 3,
                    bgcolor: "background.default",
                  }}
                >
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* Categories */}
                    <Route path="categories" element={<CategoriesList />} />
                    <Route path="categories/add" element={<AddCategory />} />
                    <Route path="categories/edit/:id" element={<EditCategory />} />

                    {/* Listings */}
                    <Route path="listings" element={<ListingsList />} />
                    <Route path="listings/add" element={<AddListing />} />
                    <Route path="listings/edit/:id" element={<EditListing />} />

                    {/* Bookings */}
                    <Route path="bookings/requests" element={<BookingRequests />} />
                    <Route path="bookings/history" element={<BookingHistory />} />

                    {/* Redirect unmatched protected */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown public routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
