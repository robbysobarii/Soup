import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  components: {
    // Name of the component
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle2: "p",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: "none",
          paddingInline: "60px",
          textTransform: "none",
          borderRadius: "8px",
          fontSize: "16px",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#fff",
      main: "#5B4947",
      dark: "#5B4947",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#FABC1D",
      dark: "#FABC1D",
      contrastText: "#5B4947",
    },
  },
  typography: {
    h5: {
      fontSize: "24px",
      fontWeight: "600",
    },
    h4: {
      fontSize: "32px",
      fontWeight: "600",
    },
    h3: {
      fontSize: "40px",
      fontWeight: "600",
    },
    subtitle2: {
      fontWeight: "400",
    },
    fontFamily: "Montserrat",
  },
});
