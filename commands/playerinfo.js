const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  let randomColor = Math.floor(Math.random()*16777215).toString(16);

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
  console.log(`UUID is ${uuid}`);
  console.log(`username is ${username}`)


  let api = `https://api.hypixel.net/player?uuid=${uuid}&key=${config["api-key"]}`;
  console.log(api);


  let apiJSON
  fetch(api)
  .then(res => res.json())
  .then(data => apiJSON = data)
  .then(() => {
  let networkEXP = JSON.stringify(apiJSON.player.networkExp)
  let firstLoginStr = JSON.stringify(apiJSON.player.firstLogin)
  let lastLoginStr = JSON.stringify(apiJSON.player.lastLogin)
  let karmaStr = JSON.stringify(apiJSON.player.karma)
  let versionStr = JSON.stringify(apiJSON.player.mcVersionRp)
  let lastGame = apiJSON.player.mostRecentGameType
  // let DiscordStr = apiJSON.links.DISCORD
  

  // first login
  let firstLoginInt = parseInt(firstLoginStr);
  let dateString = new Date(firstLoginInt);
  let getDate = dateString.getDate();
  let getMonth = dateString.getMonth() + 1;
  let getYear = dateString.getFullYear();
  let firstLogin = `${getMonth}/${getDate}/${getYear}`
  // for last login
  let lastLoginInt = parseInt(lastLoginStr);
  let lastDateString = new Date(lastLoginInt);
  let LastGetDate = lastDateString.getDate();
  let LastgetMonth = lastDateString.getMonth() + 1;
  let LastGetYear = lastDateString.getFullYear();
  let lastLogin = `${LastgetMonth}/${LastGetDate}/${LastGetYear}`

  let version = versionStr.slice(1,versionStr.length-1);

  let networkLevel = Math.round(((Math.sqrt((2 * networkEXP) + 30625) / 50) - 2.5) * 100) / 100;

  const embed = new Discord.MessageEmbed()
    .setTitle(username)
    .setThumbnail(`https://visage.surgeplay.com/bust/512/${uuid}`)
    .setColor(randomColor)
    .addFields(
    {name: `\`•\` Network Level: **${networkLevel}** \n\`•\` First Login: **${firstLogin}** \n\`•\` Last Login: **${lastLogin}** \n\`•\` Karma: **${karmaStr}**`, value: `\u200B ` ,inline: true },
    {name:`\`•\` Version: **${version}** \n\`•\` Last Game: **${lastGame}**` , value: `\u200B`, inline: true})

console.log({embed});
    message.reply({embed});
  })       
}
//name this the command name .
module.exports.help = {
  name: "stats"
}