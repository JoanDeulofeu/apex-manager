import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
	},
}));

export default function ProgressBar(props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Box sx={{ width: "100%", mr: 1 }}>
					<BorderLinearProgress {...props} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="text">{`${Math.round(
						props.value
					)}%`}</Typography>
				</Box>
			</Box>
		</Box>
	);
}
