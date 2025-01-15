import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6BD1FF',
    },
    secondary: {
      main: '#262626',
    },
    background: {
      default: '#000',
      paper: '#111',
    },
    text: {
      primary: '#FFF',
      secondary: '#AAA',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      color: '#FFF',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 700,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#03122F',
          color: '#FFF',
          overflowX: 'hidden',
        },
      },
    },
  },
});

export default theme;
