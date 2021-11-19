import { Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			marginTop: 20,
		},
	})
);

const FOUR_MINUTES_IN_MS = 240;

const Counter = ({ refreshPlayersData, isDisplay }) => {
	const styles = useStyles();
	const [counter, setCounter] = React.useState(1);

	const timeOut = (ms) => new Promise((f) => setTimeout(f, ms));

	const countRefresh = async () => {
		//wait 1 second
		await timeOut(1000);
		setCounter((e) => {
			if (e === 1) {
				return FOUR_MINUTES_IN_MS;
			} else {
				return e - 1;
			}
		});
	};

	const formatRefresh = (secondsTotal) => {
		const second = secondsTotal % 60;
		const minute = Math.floor(secondsTotal / 60);
		return `0${minute}:${second < 10 ? "0" : ""}${second}`;
	};

	React.useEffect(() => {
		// console.log("counter", counter);
		if (counter === 1) {
			console.log("REFRESH !!!!!!!!!!!!!!!!!!!!");
			refreshPlayersData();
		}
		countRefresh();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [counter]);

	return (
		<div className={styles.container}>
			{isDisplay && (
				<Typography variant="text">{`Refresh in: ${formatRefresh(
					counter
				)}`}</Typography>
			)}
		</div>
	);
};

export default Counter;
