import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { register } from "../../store/actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    setFormError(null);
    dispatch(register({ email, password }));
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" align="center" mb={3}>
        Create a New Account
      </Typography>

      {(error || formError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError || error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          required
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
        />
        <Box sx={{ position: "relative", mt: 3 }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
          >
            Register
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>

      <Typography mt={2} textAlign="center">
        Already have an account?{" "}
        <Link component={RouterLink} to="/login" underline="hover">
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
