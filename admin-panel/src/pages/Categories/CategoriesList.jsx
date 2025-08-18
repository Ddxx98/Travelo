// src/pages/Categories/CategoriesList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { fetchCategories, deleteCategory } from "../../store/actions/categoryActions";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get categories slice from Redux store
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/categories/add");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Categories</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add Category
        </Button>
      </Box>

      {loading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && categories.length === 0 && (
        <Typography>No categories found.</Typography>
      )}

      {!loading && categories.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(({ id, name, description }) => (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      onClick={() => handleEdit(id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={() => handleDelete(id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CategoriesList;
