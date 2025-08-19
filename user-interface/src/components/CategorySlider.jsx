import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/actions/categoryActions";
import { Box, Chip, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ display: "flex", overflowX: "auto", gap: 1, py: 2 }}>
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          clickable
          onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
        />
      ))}
    </Box>
  );
};

export default CategorySlider;
