import { Paper, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import Button from "./components/Button";
import players from "./constants/players";
import ProgressBar from "./components/ProgressBar";
import PlayerPaper from "./components/PlayerPaper";
import Counter from "./components/Counter";

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			minHeight: "100vh",
			padding: 20,
		},
		searchBarContainer: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			padding: 20,
			width: "100%",
			marginBottom: 50,
		},
		searchBar: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			width: "100%",
		},
		playerPaper: {
			minHeight: 240,
			display: "flex",
			flexDirection: "column",
			padding: 10,
		},
		progressContainer: {
			display: "flex",
			flexDirection: "column",
			width: "80%",
			justifyContent: "center",
			alignItems: "center",
			marginTop: 20,
		},
		progressBarContainer: {
			display: "flex",
			width: "100%",
		},
	})
);

const App = () => {
	const styles = useStyles();

	const [playersData, setPlayersData] = React.useState(players);
	const [onLoading, setOnLoading] = React.useState(false);
	const [progressPercentage, setProgressPercentage] = React.useState(100);
	const [playerInRequest, setPlayerInRequest] = React.useState();

	const getPlayersData = async (playerUid) => {
		const res = await fetch(`http://localhost:8080/player/${playerUid}`);
		const text = JSON.parse(await res.text());
		if (text.statusCode !== 404) {
			return text;
		} else {
			return 0;
		}
	};

	const timeOut = (ms) => new Promise((f) => setTimeout(f, ms));

	const refreshPlayersData = React.useCallback(async () => {
		setOnLoading(true);
		setProgressPercentage(0);
		let unresolvedPromises = [];
		let i = 0;
		for (let _playerData of playersData) {
			unresolvedPromises.push(getPlayersData(_playerData.name));
			setPlayerInRequest(_playerData.name);
			setProgressPercentage((++i * 100) / playersData.length);
			// Wait 1 second between each request due to the API limitations
			await timeOut(1100);
		}
		const results = await Promise.all(unresolvedPromises);
		setPlayersData((oldPlayersData) => {
			const result = oldPlayersData.map((_playerData) => {
				const data = results.find(
					(_res) => _res?.global?.name === _playerData.name
				);
				if (data) {
					return {
						..._playerData,
						data,
					};
				} else {
					return _playerData;
				}
			});
			return result;
		});
		setPlayerInRequest();
		setOnLoading(false);
	}, [playersData]);

	return (
		<div className={styles.container}>
			<Paper className={styles.searchBarContainer}>
				<div className={styles.searchBar}>
					<Typography variant="text">Get player data:</Typography>

					<Button
						text={"GET"}
						onClick={() => (!onLoading ? refreshPlayersData() : null)}
					/>
				</div>
				<Counter
					refreshPlayersData={() => refreshPlayersData()}
					isDisplay={progressPercentage === 100}
				/>
				{progressPercentage !== 100 && (
					<div className={styles.progressContainer}>
						<div className={styles.progressBarContainer}>
							<ProgressBar variant="determinate" value={progressPercentage} />
						</div>
						<Typography variant="text">
							{`Request: ${playerInRequest}`}
						</Typography>
					</div>
				)}
			</Paper>

			{playersData && <PlayerPaper playersData={playersData} />}
		</div>
	);
};

export default App;
