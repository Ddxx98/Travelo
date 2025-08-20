// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
    primary: {
      main: "#1976d2", // Your primary blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e", // Your secondary pink/red
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f6f8", // Light gray for app background
      paper: "#ffffff", // White for surface cards and papers
    },
    text: {
      primary: "#222222", // Slightly darker for better readability
      secondary: "#555555",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    divider: "#e0e0e0", // Used for borders and dividers
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700, // Slightly bolder for headings
      letterSpacing: "-0.01562em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "0.0075em",
    },
    button: {
      textTransform: "none", // Disable uppercase transform on buttons
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12, // Consistent rounded corners app-wide
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Matches theme shape
          padding: "10px 28px",
          fontWeight: 600,
          boxShadow: "none",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
          },
        },
        containedPrimary: {
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
            boxShadow: "0 6px 20px rgba(21, 101, 192, 0.6)",
          },
        },
        outlinedPrimary: {
          borderColor: "#1976d2",
          "&:hover": {
            borderColor: "#1565c0",
            backgroundColor: "rgba(21, 101, 192, 0.04)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          borderRadius: 16,
          backgroundColor: "#ffffff",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
          backgroundImage: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#f9f9f9",
          borderRadius: 8,
          padding: "6px 12px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#ffffff",
          },
          "&.Mui-focused": {
            backgroundColor: "#ffffff",
          },
        },
        input: {
          padding: "10px 12px",
        },
      },
    },
  },
});

export default theme;
