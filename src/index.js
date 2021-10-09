const fs = require('fs');
const colour = require('colour');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
	intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
	presence: {
		status: 'online',
		activity: {
			name: 'Dub Nation',
			type: 'PLAYING'
		}
	}
});

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

(async () => {
	for (file of functions){
		require(`./functions/${file}`)(client);
	}

	client.handleEvents(eventsFiles, './src/events');
	client.handleCommands(commandFolders, './src/commands');
	client.login(process.env.SECRET);
})();