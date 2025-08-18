import { createSlice } from "@reduxjs/toolkit";
import { fetchListings, addListing, editListing, deleteListing } from "../actions/listingActions";

const initialState = {
  listings: [],
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
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
        const index = state.listings.findIndex(listing => listing.id === action.payload.id);
        if (index !== -1) {
          state.listings[index] = action.payload;
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
        state.listings = state.listings.filter(listing => listing.id !== action.payload);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listingSlice.reducer;
