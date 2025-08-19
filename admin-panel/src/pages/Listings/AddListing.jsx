// src/pages/Listings/AddListing.jsx
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
import { useDispatch, useSelector } from "react-redux";
import { addListing } from "../../store/actions/listingActions";
import { fetchCategories } from "../../store/actions/categoryActions";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.listings);
  const { categories } = useSelector((state) => state.categories);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // New price state
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (formError) {
      setFormError(null);
    }
  }, [title, category, status, description, price]); // Added price

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }
    if (!category) {
      setFormError("Category must be selected");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setFormError("Please enter a valid positive price");
      return;
    }

    const listingData = { title, category, status, description, price: Number(price) };

    dispatch(addListing(listingData))
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
        Add New Listing
      </Typography>

      {(error || formError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError || error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          autoFocus
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          required
          margin="normal"
          disabled={loading}
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={loading}
        />

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
          <Button variant="contained" type="submit" fullWidth disabled={loading}>
            Add Listing
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AddListing;
