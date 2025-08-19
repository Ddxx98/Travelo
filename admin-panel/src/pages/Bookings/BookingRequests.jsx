// src/pages/Bookings/BookingRequests.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import {
  fetchBookingRequests,
  approveBookingRequest,
  rejectBookingRequest,
} from "../../store/actions/bookingActions";

const BookingRequests = () => {
  const dispatch = useDispatch();

  const { requests, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookingRequests());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveBookingRequest(id));
  };

  const handleReject = (id) => {
    dispatch(rejectBookingRequest(id));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Booking Requests
      </Typography>

      {loading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && requests.length === 0 && (
        <Typography>No booking requests found.</Typography>
      )}

      {!loading && requests.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Listing</TableCell>
                <TableCell>Check-In</TableCell>
                <TableCell>Check-Out</TableCell>
                <TableCell>Guests</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>{booking.userId || "N/A"}</TableCell>
                  <TableCell>{booking.listingId || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>{booking.address}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell align="center">
                    {booking.status === "pending" && (
                      <>
                        <IconButton
                          color="success"
                          aria-label="approve"
                          onClick={() => handleApprove(booking._id)}
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="reject"
                          onClick={() => handleReject(booking._id)}
                        >
                          <Cancel />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BookingRequests;
