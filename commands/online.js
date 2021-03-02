const Discord = require("discord.js");
const fetch = require('node-fetch');
const token = require("../main.js")

const bot = new Discord.Client();
exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || message.author
  
  let randomColor = Math.floor(Math.random()*16777215).toString(16);

  let api = `https://api.hypixel.net/status?key=${token.api}&uuid=`;
  let username = args.join(' ');
  if(!username){
    return message.reply('Please input a name!');
  }

  function getId(username) { //grabs the player's mojang UUID
  return fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    .then(data => data.json())
    .then(player => player.id);
}

let uuid = await getId(args[0]);
let apiJSON
  fetch(api + uuid)
  .then(res => res.json())
  .then(data => apiJSON = data)
  .then(() => { 
    const isOnline = JSON.stringify(apiJSON.session.online)
    const gameMode =  apiJSON.session.gameType
    const map =  apiJSON.session.mode

      
    if(isOnline == 'true'){
      const embed = new Discord.MessageEmbed()
        .setTitle(`${username}: Online`)
        .addField('Playing',`${gameMode}: ${map}`)
        .setThumbnail(`https://visage.surgeplay.com/bust/512/${uuid}`)
        .setColor(randomColor); 
      message.reply(embed);
    } else{
      const embed = new Discord.MessageEmbed()
        .setTitle(`${username}: Offline :(`)
        .setThumbnail(`https://visage.surgeplay.com/bust/512/${uuid}`)
        .setColor(randomColor);
      message.reply(embed);
    }
  })
}
//name this whatever the command name is.
module.exports.help = {
  name: "status"
}