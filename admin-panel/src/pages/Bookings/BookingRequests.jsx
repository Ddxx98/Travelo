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
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  fetchBookingRequests,
  approveBookingRequest,
  rejectBookingRequest,
} from "../../store/actions/bookingActions";

const BookingRequests = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  if (!requests?.length) {
    return <Typography>No booking requests found.</Typography>;
  }

  // Render card list in mobile for readability
  if (isMobile) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, px: 1 }}>
          Booking Requests
        </Typography>
        <Stack spacing={2} px={1}>
          {requests.map((booking) => (
            <Card key={booking._id} variant="outlined" sx={{ p: 1 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom noWrap>
                  Booking ID: {booking._id}
                </Typography>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  User: {booking.userId || "N/A"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Listing: {booking.listingId || "N/A"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Check-In: {new Date(booking.checkIn).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Check-Out: {new Date(booking.checkOut).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Guests: {booking.guests}
                </Typography>
                <Typography variant="body2" gutterBottom noWrap>
                  Address: {booking.address}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Status: {booking.status}
                </Typography>

                {booking.status === "pending" && (
                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    <IconButton
                      color="success"
                      aria-label="approve"
                      onClick={() => handleApprove(booking._id)}
                      size="small"
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="reject"
                      onClick={() => handleReject(booking._id)}
                      size="small"
                    >
                      <Cancel />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }

  // Default desktop/table view with horizontal scroll container
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Booking Requests
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
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
                <TableCell sx={{ maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {booking._id}
                </TableCell>
                <TableCell>{booking.userId || "N/A"}</TableCell>
                <TableCell>{booking.listingId || "N/A"}</TableCell>
                <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell sx={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {booking.address}
                </TableCell>
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
    </Box>
  );
};

export default BookingRequests;
