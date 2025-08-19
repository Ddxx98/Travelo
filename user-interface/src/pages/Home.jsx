// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, CircularProgress, Box, Alert } from "@mui/material";
import { fetchListings } from "../store/actions/listingActions";
import ListingCard from "../components/ListingCard";
import CategorySlider from "../components/CategorySlider";  // import CategorySlider

const Home = () => {
  const dispatch = useDispatch();

  const { listings, loading, error } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <Box>
      {/* Category slider at the top */}
      <CategorySlider />

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Featured Listings
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && listings.length === 0 && (
        <Typography>No listings available.</Typography>
      )}

      <Grid container spacing={3}>
        {listings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing._id}>
            <ListingCard listing={listing} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
