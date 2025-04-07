// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#cccccc",
            },
          }
        : {
            background: {
              default: "#fafafa",
              paper: "#fff",
            },
            text: {
              primary: "#000000",
              secondary: "#555555",
            },
          }),
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });
