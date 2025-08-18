// src/pages/Listings/ListingsList.jsx
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
import { fetchListings, deleteListing } from "../../store/actions/listingActions";
import { useNavigate } from "react-router-dom";

const ListingsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listings, loading, error } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      dispatch(deleteListing(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/listings/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/listings/add");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Listings</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add Listing
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

      {!loading && listings.length === 0 && (
        <Typography>No listings found.</Typography>
      )}

      {!loading && listings.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map(({ id, title, category, status }) => (
                <TableRow key={id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{category?.name || "N/A"}</TableCell>
                  <TableCell>{status}</TableCell>
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

export default ListingsList;
