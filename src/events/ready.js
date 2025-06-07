const { ActivityType, Client } = require("discord.js")
const config = require("../config.js");

let sunucuismi = config.sunucuismi

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setPresence({
			activities: [{ name: `${sunucuismi}`, type: ActivityType.Playing }],
			status: 'idle',
		  });
}};
