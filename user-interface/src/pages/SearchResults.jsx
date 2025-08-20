// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../store/actions/listingActions";
import ListingCard from "../components/ListingCard";

const SearchResults = () => {
  const dispatch = useDispatch();

  const { listings, loading, error } = useSelector((state) => state.listings);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  // Filter listings locally based on search term (or implement server filtering if preferred)
  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Search Listings
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search by title"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>

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

      {!loading && !error && filteredListings.length === 0 && (
        <Typography>No listings match your search.</Typography>
      )}

      <Grid container spacing={3}>
        {filteredListings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing.id}>
            <ListingCard listing={listing} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;
