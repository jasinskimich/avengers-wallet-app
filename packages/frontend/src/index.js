import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fff",
			secondary: "#4A56E2",
			green: "#24CCA7",
			red: "#FF6596",
		},
		text: {
			standard: "#00838f",
			gray: "#BDBDBD",
		},
		button: {
			active: "#4A56E2",
			disactive: "#6E78E8",
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
          <App /> {/* Your main application component */}
      </ThemeProvider>
    </BrowserRouter>
	</React.StrictMode>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
