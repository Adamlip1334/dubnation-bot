const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  const embed = new Discord.MessageEmbed()
    .setTitle(`Ping: ${Date.now() - message.createdTimestamp}ms`)
    .setColor(randomColor)
  message.reply({embed});
  })
}
//name this whatever the command name is.
module.exports.help = {
  name: "ping"
}
