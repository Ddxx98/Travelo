import { createTheme } from '@mui/material/styles';

const primaryColor = '#1976d2';       
const secondaryColor = '#f50057';     

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: '#fff',
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8',    
      paper: '#fff',          
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none',  
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 20px rgb(25 118 210 / 0.3)',
          },
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 16,
        },
      },
    },
  },
});

export default theme;
