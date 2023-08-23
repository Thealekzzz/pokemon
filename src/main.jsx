import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Button } from '@mui/material';

const theme = createTheme({
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
