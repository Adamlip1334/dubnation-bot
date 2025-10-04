const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { MongoClient } = require('mongodb');
require('dotenv').config();
require('colour');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  presence: {
    status: 'online',
    activity: {
      name: 'Dub Nation',
      type: 'PLAYING',
    },
  },
});
exports.queue = {};
exports.db = new MongoClient(process.env.MONGOURI);
exports.db.connect();
client.commands = new Collection();

const functions = fs
  .readdirSync('./src/functions')
  .filter((file) => file.endsWith('.js'));
const eventsFiles = fs
  .readdirSync('./src/events')
  .filter((file) => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

(async () => {
  for (const file of functions) {
    require(`./functions/${file}`)(client);
  }

  client.handleEvents(eventsFiles, './src/events');
  client.handleCommands(commandFolders, './src/commands');
  client.login(process.env.SECRET);
})();
