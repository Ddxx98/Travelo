// src/pages/Dashboard.jsx
import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // Extract data from the Redux store slices
  const categories = useSelector((state) => state.categories.categories);
  const listings = useSelector((state) => state.listings.listings);

  const bookingRequests = useSelector((state) =>
    state.bookings.requests.filter((req) => req.status === "pending")
  );
  const bookingsToday = useSelector((state) => {
    const today = new Date().toDateString();
    return state.bookings.history.filter(
      (booking) => new Date(booking.date).toDateString() === today
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Categories */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Categories</Typography>
            <Typography variant="h3" color="primary">
              {categories.length}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Listings */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Listings</Typography>
            <Typography variant="h3" color="primary">
              {listings.length}
            </Typography>
          </Paper>
        </Grid>

        {/* Bookings Today */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Bookings Today</Typography>
            <Typography variant="h3" color="primary">
              {bookingsToday.length}
            </Typography>
          </Paper>
        </Grid>

        {/* Pending Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Pending Requests</Typography>
            <Typography variant="h3" color="primary">
              {bookingRequests.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
