import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Paper,
} from "@mui/material";
import { fetchListingDetails } from "../store/actions/listingActions";
import BookingModal from "../components/BookingModal";
import { createBooking } from "../store/actions/bookingActions"; // You need to create this action

const ListingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { listing, loading, error } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.auth); // assuming user must be logged in

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListingDetails(id));
  }, [dispatch, id]);

  const handleBookNowClick = () => {
    setBookingModalOpen(true);
  };

  const handleBookingClose = () => {
    setBookingModalOpen(false);
    setBookingError(null);
  };

  const handleBookingSubmit = async (bookingData) => {
    setBookingLoading(true);
    setBookingError(null);
    try {
      await dispatch(
        createBooking({
          listingId: id,
          userId: user._id,
          status: "pending", // default status pending
          ...bookingData,
        })
      ).unwrap();
      setBookingLoading(false);
      setBookingModalOpen(false);
      alert("Booking request submitted! Status is pending approval.");
    } catch (err) {
      setBookingLoading(false);
      setBookingError(err || "Failed to create booking.");
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

  if (!listing) {
    return <Typography>No listing found.</Typography>;
  }

  return (
    <Paper sx={{ p: 4 }}>
      {listing.image && (
        <Box
          component="img"
          src={listing.image}
          alt={listing.title}
          sx={{ width: "100%", maxHeight: 400, objectFit: "cover", mb: 3 }}
        />
      )}
      <Typography variant="h4" gutterBottom>
        {listing.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        ${listing.price} per night
      </Typography>
      <Typography variant="body1" paragraph>
        {listing.description}
      </Typography>

      {listing.features && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Features:</Typography>
          <ul>
            {listing.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </Box>
      )}

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleBookNowClick}>
        Book Now
      </Button>

      {/* Booking modal */}
      <BookingModal
        open={bookingModalOpen}
        onClose={handleBookingClose}
        onBook={handleBookingSubmit}
      />

      {bookingLoading && (
        <Typography sx={{ mt: 2 }}>Submitting your booking...</Typography>
      )}
      {bookingError && <Alert severity="error">{bookingError}</Alert>}
    </Paper>
  );
};

export default ListingDetails;
