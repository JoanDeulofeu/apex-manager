import { Grid, Paper, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";

const useStyles = makeStyles(() =>
	createStyles({
		playerPaper: {
			minHeight: 240,
			display: "flex",
			flexDirection: "column",
			padding: 10,
		},
		textTitle: {
			fontSize: 16,
			fontWeight: "bold",
			color: "white !important",
		},
		nameContainer: {
			display: "flex",
			width: "100%",
			justifyContent: "center",
			alignItems: "center",
		},
	})
);

const PlayerPaper = ({ playersData }) => {
	const styles = useStyles();

	console.log(playersData);

	return (
		<Grid container spacing={2}>
			{playersData.map((_player) => {
				return (
					<Grid key={_player.uid} item xs={2.4}>
						<Paper className={styles.playerPaper}>
							<div className={styles.nameContainer}>
								<AccountCircle
									sx={{
										color: !_player?.data?.realtime?.isInGame ? "red" : "lime",
									}}
								/>
								<Typography
									sx={{ margin: 2 }}
									className={styles.textTitle}
									variant="text"
								>
									{_player.name}
								</Typography>
								{_player.data && (
									<img
										src={_player?.data?.legends?.selected?.ImgAssets?.icon}
										alt={`${_player?.data?.legends?.selected?.LegendName}`}
										style={{ width: 60 }}
									/>
								)}
							</div>
							<Typography variant="text">{`Id: ${_player.uid}`}</Typography>
							{_player.data && (
								<>
									<Typography
										sx={{
											color:
												_player?.data?.global?.platform !== "PS4"
													? "red"
													: null,
										}}
										variant="text"
									>{`Platform: ${_player?.data?.global?.platform}`}</Typography>
									<Typography variant="text">{`Level: ${_player?.data?.global?.level}`}</Typography>
									<Typography variant="text">{`Rank BR: ${_player?.data?.global?.rank?.rankName} ${_player?.data?.global?.rank?.rankDiv}`}</Typography>
									<Typography variant="text">{`Rank Arena: ${
										_player?.data?.global?.arena?.rankName
									} ${
										_player?.data?.global?.arena?.rankName !== "Unranked"
											? _player?.data?.global?.arena?.rankDiv
											: ""
									}`}</Typography>
									<Typography variant="text">{`Last legend: ${_player?.data?.legends?.selected?.LegendName}`}</Typography>
								</>
							)}
						</Paper>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default PlayerPaper;
