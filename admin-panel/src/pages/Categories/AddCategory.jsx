// src/pages/Categories/AddCategory.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { addCategory } from "../../store/actions/categoryActions";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    // Optional: Clear error on field changes
    if (formError) {
      setFormError(null);
    }
  }, [name, description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Name is required");
      return;
    }

    dispatch(addCategory({ name, description }))
      .unwrap()
      .then(() => {
        navigate("/categories");
      })
      .catch(() => {
        // error handled in redux, just do nothing or log if needed
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={3}>
        Add New Category
      </Typography>

      {(error || formError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError || error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />

        <Box sx={{ position: "relative", mt: 3 }}>
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            Add Category
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

export default AddCategory;
