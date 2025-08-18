// src/pages/Bookings/BookingRequests.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
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
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map(
                ({ id, user, listing, date, status }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{user?.name || "N/A"}</TableCell>
                    <TableCell>{listing?.title || "N/A"}</TableCell>
                    <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell align="center">
                      {status === "pending" && (
                        <>
                          <IconButton
                            color="success"
                            aria-label="approve"
                            onClick={() => handleApprove(id)}
                          >
                            <CheckCircle />
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label="reject"
                            onClick={() => handleReject(id)}
                          >
                            <Cancel />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BookingRequests;
