// src/pages/Listings/EditListing.jsx
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editListing, fetchListings } from "../../store/actions/listingActions";
import { fetchCategories } from "../../store/actions/categoryActions";

const EditListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listings, loading, error } = useSelector((state) => state.listings);
  const { categories } = useSelector((state) => state.categories);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    if (!listings.length) {
      dispatch(fetchListings());
    } else {
      const listing = listings.find((l) => l.id === id);
      if (listing) {
        setTitle(listing.title);
        setCategoryId(listing.categoryId || "");
        setStatus(listing.status || "active");
        setDescription(listing.description || "");
      } else {
        navigate("/listings"); // Redirect if listing not found
      }
    }
  }, [categories, listings, dispatch, id, navigate]);

  useEffect(() => {
    if (formError) {
      setFormError(null);
    }
  }, [title, categoryId, status, description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }
    if (!categoryId) {
      setFormError("Category must be selected");
      return;
    }

    dispatch(editListing({ id, updates: { title, categoryId, status, description } }))
      .unwrap()
      .then(() => {
        navigate("/listings");
      })
      .catch(() => {
        // Error handled in redux state
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={3}>
        Edit Listing
      </Typography>

      {(error || formError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError || error}
        </Alert>
      )}

      {loading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            disabled={loading}
          />

          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
            required
            margin="normal"
            disabled={loading}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
            disabled={loading}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />

          <Box sx={{ position: "relative", mt: 3 }}>
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              Save Changes
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default EditListing;
