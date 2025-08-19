// src/store/actions/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Login action
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            return { user, token };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Logout action (sync)
export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "auth/logout" });
};

// Verify token action
export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/verify`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // user info or token validity
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
    "auth/updateUserProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/auth/profile`, profileData, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
