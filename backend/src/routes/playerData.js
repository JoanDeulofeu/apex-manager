const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

/**
 * Get player data
 */
const getPlayerData = async (req, h) => {
	const res = await fetch(
		`https://api.mozambiquehe.re/bridge?version=5&platform=PS4&player=${req.params.player_name}&auth=${process.env.APEXAPI_KEY}`
	).then((response) => {
		return response;
	});
	return await res.text();
};

module.exports = { getPlayerData };
