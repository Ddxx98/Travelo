// src/pages/Bookings/BookingHistory.jsx
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
} from "@mui/material";
import { fetchBookingHistory } from "../../store/actions/bookingActions";

const BookingHistory = () => {
  const dispatch = useDispatch();

  const { history, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Booking History
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

      {!loading && history.length === 0 && (
        <Typography>No past bookings found.</Typography>
      )}

      {!loading && history.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Listing</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map(
                ({ id, user, listing, date, status }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{user?.name || "N/A"}</TableCell>
                    <TableCell>{listing?.title || "N/A"}</TableCell>
                    <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                    <TableCell>{status}</TableCell>
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

export default BookingHistory;
