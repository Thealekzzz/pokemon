import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif',
  },
  palette: {
    paper: {
      main: '#FFF'
    },
    background: {
      black: '#000',
    },
    text: {
      white: '#FFF',
      light: '#A0A0A0',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      md: 900,
      lg: 1280,
    },
  },
});
