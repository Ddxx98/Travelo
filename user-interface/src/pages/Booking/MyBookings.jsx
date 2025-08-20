// src/pages/Booking/MyBookings.jsx
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, cancelBooking } from "../../store/actions/bookingActions";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userBookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking(id));
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/booking/${id}`);
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

  if (!userBookings || userBookings.length === 0) {
    return <Typography>You have no bookings.</Typography>;
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      <List>
        {userBookings.map((booking) => (
          <React.Fragment key={booking._id}>
            <ListItem
              secondaryAction={
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleViewDetails(booking._id)}
                  >
                    Details
                  </Button>
                  {booking.status === "pending" && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </>
              }
            >
              <ListItemText
                primary={booking.listingTitle}
                secondary={`Date: ${new Date(booking.checkIn).toLocaleDateString()} | Status: ${booking.status}`}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default MyBookings;
