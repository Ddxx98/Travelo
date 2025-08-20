// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Link, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: "center",
        // Removed mt: "auto" to avoid sticky behavior
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Travelo. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        <Link href="/privacy" underline="hover" color="inherit" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        |
        <Link href="/terms" underline="hover" color="inherit" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
