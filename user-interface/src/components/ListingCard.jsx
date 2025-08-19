// src/components/ListingCard.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/listing/${listing._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {listing.image && (
        <CardMedia
          component="img"
          height="180"
          image={listing.image}
          alt={listing.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {listing.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
          ${listing.price} per night
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
