// src/store/actions/listingActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all listings
export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/listings`, {
        headers: getAuthHeaders(),
      });
      return response.data; // Array of listings
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch single listing details by ID
export const fetchListingDetails = createAsyncThunk(
  "listings/fetchListingDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/listings/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data; // Single listing object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a new listing
export const addListing = createAsyncThunk(
  "listings/addListing",
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/listings`, listingData, {
        headers: getAuthHeaders(),
      });
      return response.data; // Created listing
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit a listing
export const editListing = createAsyncThunk(
  "listings/editListing",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/listings/${id}`, updates, {
        headers: getAuthHeaders(),
      });
      return response.data; // Updated listing
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a listing
export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
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
