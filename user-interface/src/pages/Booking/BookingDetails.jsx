// src/pages/Booking/BookingDetails.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Button,
} from "@mui/material";
import { fetchBookingDetails, cancelBooking } from "../../store/actions/bookingActions";

const BookingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { bookingDetails, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookingDetails(id));
  }, [dispatch, id]);

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking(id));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!bookingDetails) {
    return <Typography>No booking found.</Typography>;
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        {bookingDetails.listingTitle}
      </Typography>
      <Typography>Date: {new Date(bookingDetails.checkIn).toLocaleDateString()}</Typography>
      <Typography>Status: {bookingDetails.status}</Typography>
      <Typography>Guests: {bookingDetails.guests}</Typography>
      <Typography>Price: ${bookingDetails.price}</Typography>

      {bookingDetails.notes && (
        <Typography sx={{ mt: 2 }}>Notes: {bookingDetails.notes}</Typography>
      )}

      {bookingDetails.status === "pending" && (
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3 }}
          onClick={handleCancel}
        >
          Cancel Booking
        </Button>
      )}
    </Paper>
  );
};

export default BookingDetails;
