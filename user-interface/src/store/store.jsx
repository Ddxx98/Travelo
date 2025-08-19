// src/store/store.jsx
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import listingReducer from "./reducers/listingReducer";
import bookingReducer from "./reducers/bookingReducer";
import categoryReducer from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    bookings: bookingReducer,
    categories: categoryReducer,
  }
});

export default store;
