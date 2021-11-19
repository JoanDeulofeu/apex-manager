import darkScrollbar from "@mui/material/darkScrollbar";
import { createTheme } from "@mui/material/styles";

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
		LinearProgress: {
			styleOverrides: { root: { backgroundColor: "#84f" } },
		},
	},
});

export default theme;
