import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer"
import listingReducer from "./reducers/listingReducer"
import bookingReducer from "./reducers/bookingReducer"
// import other reducers as necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    listings: listingReducer,
    bookings: bookingReducer,
    // other reducers
  },
});

export default store;
