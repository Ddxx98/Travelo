// src/store/reducers/listingReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListings,
  fetchListingDetails,
  addListing,
  editListing,
  deleteListing,
} from "../actions/listingActions";

const initialState = {
  listings: [],
  listing: null, // Details of single listing
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    clearListing(state) {
      state.listing = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchListings
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchListingDetails
      .addCase(fetchListingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.listing = action.payload;
      })
      .addCase(fetchListingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addListing
      .addCase(addListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings.push(action.payload);
      })
      .addCase(addListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // editListing
      .addCase(editListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editListing.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.listings.findIndex((l) => l.id === action.payload.id);
        if (idx !== -1) {
          state.listings[idx] = action.payload;
        }
      })
      .addCase(editListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteListing
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = state.listings.filter((l) => l.id !== action.payload);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearListing } = listingSlice.actions;
export default listingSlice.reducer;
