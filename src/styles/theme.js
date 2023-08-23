import { createMuiTheme } from "@mui/material";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontSize: 14,
    fontWeightBold: 700,
    fontFamily: 'Roboto',
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },  
});
