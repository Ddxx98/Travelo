// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ListingDetails from "./pages/ListingDetails";
import MyBookings from "./pages/Booking/MyBookings";
import BookingDetails from "./pages/Booking/BookingDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import { Box } from "@mui/material";

const drawerWidth = 240;
const headerHeight = 64;

const App = () => {
  return (
    <>
      <CssBaseline /> {/* Normalize styles */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex", height: "100vh" }}>
                {/* Sidebar */}
                <Sidebar
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
                  }}
                />

                {/* Main area */}
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
                  {/* Header */}
                  <Header
                    sx={{
                      height: headerHeight,
                      flexShrink: 0,
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                  />

                  {/* Content area with scroll */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: "auto",
                      p: 3,
                      bgcolor: "background.default",
                    }}
                  >
                    <Routes>
                      <Route index element={<Home />} />
                      <Route path="home" element={<Home />} />
                      <Route path="search" element={<SearchResults />} />
                      <Route path="listing/:id" element={<ListingDetails />} />
                      <Route path="bookings" element={<MyBookings />} />
                      <Route path="booking/:id" element={<BookingDetails />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="*" element={<NotFound />} />
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
    </>
  );
};

export default App;
