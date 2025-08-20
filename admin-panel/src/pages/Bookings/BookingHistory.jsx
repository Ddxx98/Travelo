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
  Card,
  CardContent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { fetchBookingHistory } from "../../store/actions/bookingActions";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { history, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!history?.length) {
    return <Typography>No past bookings found.</Typography>;
  }

  if (isMobile) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, px: 1 }}>
          Booking History
        </Typography>
        <Stack spacing={2} px={1}>
          {history.map((booking) => (
            <Card key={booking._id} variant="outlined" sx={{ p: 1 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom noWrap>
                  Booking ID: {booking._id}
                </Typography>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  User: {booking.user?.name || "N/A"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Listing: {booking.listing?.title || "N/A"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Date: {new Date(booking.date || booking.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Status: {booking.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Booking History
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
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
            {history.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell sx={{ maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {booking._id}
                </TableCell>
                <TableCell>{booking.user?.name || "N/A"}</TableCell>
                <TableCell>{booking.listing?.title || "N/A"}</TableCell>
                <TableCell>{new Date(booking.date || booking.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookingHistory;
