// src/components/BookingModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

const BookingModal = ({ open, onClose, onBook }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [address, setAddress] = useState("");

  const handleBookNow = () => {
    if (checkIn && checkOut && guests > 0 && address.trim()) {
      onBook({ checkIn, checkOut, guests, address });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Listing</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, minWidth: 300 }}>
        <TextField
          label="Check-in"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: new Date().toISOString().split("T")[0] }}
        />
        <TextField
          label="Check-out"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: checkIn || new Date().toISOString().split("T") }}
        />
        <TextField
          type="number"
          label="Guests"
          inputProps={{ min: 1 }}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />
        <TextField
          label="Address"
          multiline
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleBookNow} variant="contained">
          Book Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
