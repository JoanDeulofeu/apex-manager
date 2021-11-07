import { Grid, Paper, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import Button from "./components/Button";
import players from "./constants/players";

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			minHeight: "100vh",
			padding: 20,
		},
		searchBar: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			padding: 20,
			width: "100%",
			marginBottom: 50,
		},
		playerPaper: {
			height: 100,
			display: "flex",
			flexDirection: "column",
		},
		textTitle: {
			fontSize: 16,
			fontWeight: "bold",
			textAlign: "center",
			color: "white !important",
		},
	})
);

const KEY = "EArYNNRj57UZGN2xQfZ8";

const App = () => {
	const styles = useStyles();

	const [playersData, setPlayersData] = React.useState();
	const [onLoading, setOnLoading] = React.useState(false);

	const getPlayersData = async (playerUid) => {
		setPlayersData();
		setOnLoading(true);
		const res = await fetch(
			`https://api.mozambiquehe.re/games?auth=${KEY}&uid=${playerUid}`
		);
		const text = JSON.parse(await res.text());
		if (text.statusCode !== 404) {
			setPlayersData(text);
		}
		setOnLoading(false);
	};

	React.useEffect(() => {
		console.log("playersData", playersData);
	}, [playersData]);

	return (
		<div className={styles.container}>
			<Paper className={styles.searchBar}>
				<Typography variant="text">Get player data:</Typography>

				<Button
					disabled={onLoading}
					text={"GET"}
					onClick={() => getPlayersData("1670340576586650508")}
				/>
			</Paper>
			<Grid container spacing={2}>
				{players.map((_player) => {
					return (
						<Grid key={_player.uid} item xs={3}>
							<Paper className={styles.playerPaper}>
								<Typography className={styles.textTitle} variant="text">
									{_player.name}
								</Typography>
								<Typography variant="text">{_player.uid}</Typography>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default App;
