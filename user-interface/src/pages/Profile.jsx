// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../store/actions/authActions";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, loading, error, updateSuccess } = useSelector((state) => state.auth);

  // Always initialize state to empty string if user or its fields might be undefined.
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    } else {
      setName(user?.name ?? "");
      setEmail(user?.email ?? "");
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (updateSuccess) {
      setSaving(false);
    }
  }, [updateSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!name.trim()) {
      setLocalError("Name is required");
      return;
    }

    setSaving(true);
    try {
      await dispatch(updateUserProfile({ name, email })).unwrap();
      // Optionally show success message here
    } catch (err) {
      setLocalError(err);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3 }}>
      <Typography variant="h4" mb={3}>
        My Profile
      </Typography>

      {(error || localError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || localError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          required
          margin="normal"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          disabled={saving}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
          disabled={saving}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={saving}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
