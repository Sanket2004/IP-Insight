import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Space Grotesk, sans-serif",
  },
  palette: {
    primary: {
      main: "#070F2B",
    },
    secondary:{
      main: "#535C91",
    },
    background:{
      default: "#F5F5F5",
    }
  },
});

export default theme;
