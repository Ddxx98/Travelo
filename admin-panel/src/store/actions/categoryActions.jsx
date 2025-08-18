import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data; // Assuming array of category objects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a category
export const addCategory = createAsyncThunk(
  "categories/add",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
      return response.data; // Newly created category object with id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit/update a category by ID
export const editCategory = createAsyncThunk(
  "categories/edit",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/categories/${id}`, updates);
      return response.data; // Updated category object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a category by ID
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`);
      return id; // Return the deleted category id to update the state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
