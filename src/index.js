import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import darkScrollbar from "@mui/material/darkScrollbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		text: { color: "#C6D3E7" },
	},
	paper: { root: { backgroundColor: "red" } },
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					...darkScrollbar(),
					color: "white",
					backgroundColor: "#07080A",
					"& h1": {
						color: "white",
					},
				},
			},
		},
		MuiPaper: { styleOverrides: { root: { backgroundColor: "#0E1624" } } },
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
