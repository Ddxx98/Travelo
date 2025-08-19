import { createSelector } from "@reduxjs/toolkit";

// Base selectors
const selectCategories = (state) => state.categories.categories || [];
const selectListings = (state) => state.listings.listings || [];
const selectBookingRequests = (state) => state.bookings.requests || [];
const selectBookingHistory = (state) => state.bookings.history || [];

// Memoized derived selectors
export const selectTotalCategories = createSelector(
  [selectCategories],
  (categories) => categories.length
);

export const selectTotalListings = createSelector(
  [selectListings],
  (listings) => listings.length
);

export const selectPendingRequests = createSelector(
  [selectBookingRequests],
  (requests) => requests.filter((req) => req.status === "pending")
);

export const selectBookingsToday = createSelector(
  [selectBookingHistory],
  (history) => {
    const today = new Date().toDateString();
    return history.filter(
      (booking) => new Date(booking.date).toDateString() === today
    );
  }
);
