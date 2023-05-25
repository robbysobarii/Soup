import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { muiTheme } from "./styles/muiTheme";
import "./styles/global.css";
import { AdminAuthProvider, AuthProvider } from "contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <AdminAuthProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AdminAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
