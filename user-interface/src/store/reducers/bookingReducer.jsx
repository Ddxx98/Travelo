// src/store/reducers/bookingReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookingRequests,
  fetchUserBookings,
  fetchBookingDetails,
  approveBookingRequest,
  rejectBookingRequest,
  fetchBookingHistory,
  cancelBooking,
  createBooking,
} from "../actions/bookingActions";

const initialState = {
  requests: [],
  userBookings: [],
  bookingDetails: null,
  history: [],
  loading: false,
  error: null,
  createBookingLoading: false,
  createBookingError: null,
  createBookingSuccess: false,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearBookingDetails(state) {
      state.bookingDetails = null;
      state.error = null;
    },
    resetCreateBookingState(state) {
      state.createBookingLoading = false;
      state.createBookingError = null;
      state.createBookingSuccess = false;
    },
  },
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

      // fetchUserBookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchBookingDetails
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload;
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
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
        state.requests = state.requests.filter((r) => r.id !== action.payload.id);
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
        state.requests = state.requests.filter((r) => r.id !== action.payload.id);
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
      })

      // cancelBooking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter((r) => r.id !== action.payload.id);
        state.history = state.history.filter((h) => h.id !== action.payload.id);
        state.userBookings = state.userBookings.filter((b) => b.id !== action.payload.id);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createBooking
      .addCase(createBooking.pending, (state) => {
        state.createBookingLoading = true;
        state.createBookingError = null;
        state.createBookingSuccess = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.createBookingLoading = false;
        state.userBookings.push(action.payload);
        state.createBookingSuccess = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.createBookingLoading = false;
        state.createBookingError = action.payload;
        state.createBookingSuccess = false;
      });
  },
});

export const { clearBookingDetails, resetCreateBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
