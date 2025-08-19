// src/store/actions/categoryActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch categories from backend API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories`, {
        headers: getAuthHeaders(),
      });
      return response.data; // expected: array of categories
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
