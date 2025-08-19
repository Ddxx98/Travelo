// shared/authUtils.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Helper to get auth headers
 * @returns {Object} Authorization headers
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Axios promise
 */
export const login = async (email, password) => {
  return axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
};

/**
 * Register user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Axios promise
 */
export const register = async (email, password) => {
  return axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
};

/**
 * Verify token
 * @param {string} token - JWT token
 * @returns {Promise} Axios promise
 */
export const verifyToken = async (token) => {
  return axios.post(
    `${API_BASE_URL}/api/auth/verify`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("token");
};