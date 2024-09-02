import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/index.css";
import RoutesService from "./Routes/RoutesService";
import { store } from './Store/store'
import { Provider } from 'react-redux'

const theme = createTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#000000',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FF385C',
      main: '#FF385C',
      dark: '#FF385C',
      contrastText: '#000',
    },
  },
})
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutesService />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById("root")
);
