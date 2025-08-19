import React from "react";
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

import { Box } from "@mui/material";

const App = () => {
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
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Header />
                <Box sx={{ p: 3 }}>
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

                    {/* Redirect any unmatched under protected */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          </ProtectedRoute>
        }
      />

      {/* Redirect unmatched public routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;