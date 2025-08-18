import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to get token header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

// Fetch all listings
export const fetchListings = createAsyncThunk(
  "listings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/listings`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a listing
export const addListing = createAsyncThunk(
  "listings/add",
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/listings`, listingData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit a listing
export const editListing = createAsyncThunk(
  "listings/edit",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/listings/${id}`, updates, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a listing
export const deleteListing = createAsyncThunk(
  "listings/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/listings/${id}`, {
        headers: getAuthHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch a listing by ID
export const fetchListingById = createAsyncThunk(
  "listings/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/listings/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);