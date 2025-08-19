import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Grid, Paper, CircularProgress } from "@mui/material";

import {
  selectTotalCategories,
  selectTotalListings,
  selectPendingRequests,
  selectBookingsToday,
} from "../selectors/dashboardSelectors";

import { fetchCategories } from "../store/actions/categoryActions";
import { fetchListings } from "../store/actions/listingActions";
import { fetchBookingRequests, fetchBookingHistory } from "../store/actions/bookingActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  // You should have a loading flag in each part of your state, e.g. state.categories.loading
  const categoriesLoading = useSelector((state) => state.categories.loading);
  const listingsLoading = useSelector((state) => state.listings.loading);
  const bookingsLoading = useSelector((state) => state.bookings.loading);

  const totalCategories = useSelector(selectTotalCategories);
  const totalListings = useSelector(selectTotalListings);
  const pendingRequests = useSelector(selectPendingRequests);
  const bookingsToday = useSelector(selectBookingsToday);

  // Fetch if needed on mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchListings());
    dispatch(fetchBookingRequests());
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  const isLoading =
    categoriesLoading || listingsLoading || bookingsLoading;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", minHeight: "50vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

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
              {totalCategories}
            </Typography>
          </Paper>
        </Grid>
        {/* Total Listings */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Listings</Typography>
            <Typography variant="h3" color="primary">
              {totalListings}
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
              {pendingRequests.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
