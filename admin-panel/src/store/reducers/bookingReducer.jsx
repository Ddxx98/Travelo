import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookingRequests,
  approveBookingRequest,
  rejectBookingRequest,
  fetchBookingHistory,
} from "../actions/bookingActions";

const initialState = {
  requests: [],
  history: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchBookingRequests
      .addCase(fetchBookingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchBookingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // approveBookingRequest
      .addCase(approveBookingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        // update the approved booking in requests by id
        state.requests = state.requests.filter(r => r.id !== action.payload.id);
        // Optionally add to the history list if desired
        state.history.push(action.payload);
      })
      .addCase(approveBookingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // rejectBookingRequest
      .addCase(rejectBookingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        // remove rejected booking from requests
        state.requests = state.requests.filter(r => r.id !== action.payload.id);
        // Optionally add to the history list
        state.history.push(action.payload);
      })
      .addCase(rejectBookingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchBookingHistory
      .addCase(fetchBookingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
