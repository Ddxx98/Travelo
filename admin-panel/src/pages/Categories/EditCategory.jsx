// src/pages/Categories/EditCategory.jsx
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
import { useNavigate, useParams } from "react-router-dom";
import { editCategory, fetchCategories } from "../../store/actions/categoryActions";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!categories.length) {
      // If categories not loaded, fetch them (optional if you have a dedicated fetch already)
      dispatch(fetchCategories());
    } else {
      // Find category details to edit
      const category = categories.find((cat) => cat._id === id);
      if (category) {
        setName(category.name);
        setDescription(category.description || "");
      } else {
        // Category not found, could redirect or show error
        navigate("/categories");
      }
    }
  }, [categories, dispatch, id, navigate]);

  useEffect(() => {
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

    dispatch(editCategory({ id, updates: { name, description } }))
      .unwrap()
      .then(() => {
        navigate("/categories");
      })
      .catch(() => {
        // Error handled by redux state, you can handle local errors if needed
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
        Edit Category
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
              Save Changes
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default EditCategory;
