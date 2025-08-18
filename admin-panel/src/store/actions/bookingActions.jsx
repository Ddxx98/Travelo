import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch booking requests (pending)
export const fetchBookingRequests = createAsyncThunk(
  "bookings/fetchRequests",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/requests`,{
          headers: { Authorization: `Bearer ${token}` },
        });
      return response.data; // Array of booking request objects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Approve a booking request by ID
export const approveBookingRequest = createAsyncThunk(
  "bookings/approveRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings/${id}/approve`);
      return response.data; // Updated booking object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reject a booking request by ID
export const rejectBookingRequest = createAsyncThunk(
  "bookings/rejectRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings/${id}/reject`);
      return response.data; // Updated booking object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch booking history (approved/rejected bookings)
export const fetchBookingHistory = createAsyncThunk(
  "bookings/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/history`);
      return response.data; // Array of historical booking objects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
