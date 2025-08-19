// src/store/actions/bookingActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch booking requests (pending)
export const fetchBookingRequests = createAsyncThunk(
  "bookings/fetchRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/requests`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch user's bookings (all statuses)
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/user`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch single booking details by ID
export const fetchBookingDetails = createAsyncThunk(
  "bookings/fetchBookingDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
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
      const response = await axios.post(`${API_BASE_URL}/api/bookings/${id}/approve`, null, {
        headers: getAuthHeaders(),
      });
      return response.data;
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
      const response = await axios.post(`${API_BASE_URL}/api/bookings/${id}/reject`, null, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch booking history (approved/rejected)
export const fetchBookingHistory = createAsyncThunk(
  "bookings/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/history`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Cancel booking by ID (user action)
export const cancelBooking = createAsyncThunk(
  "bookings/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings/${id}/cancel`, null, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings`, bookingData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
