const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  let api = `https://api.hypixel.net/gameCounts?key=${config["api-key"]}`;
  console.log(api);
  
  let apiJSON
  fetch(api)
  .then(res => res.json())
  .then(data => apiJSON = data)
  .then(() => {
    let playerCount = JSON.stringify(apiJSON.playerCount)
    let MainLobby = JSON.stringify(apiJSON.games.MAIN_LOBBY.players)
    let Skyblock = JSON.stringify(apiJSON.games.SKYBLOCK.players)
    let Bedwars = JSON.stringify(apiJSON.games.BEDWARS.players)
    let Duels = JSON.stringify(apiJSON.games.DUELS.players)
    let buildBattle = JSON.stringify(apiJSON.games.BUILD_BATTLE.players)
    let Pit = JSON.stringify(apiJSON.games.PIT.players)
    let Housing = JSON.stringify(apiJSON.games.HOUSING.players)
    let murderMystery = JSON.stringify(apiJSON.games.MURDER_MYSTERY.players)
    let TNTGAMES = JSON.stringify(apiJSON.games.TNTGAMES.players)
    let Blitz = JSON.stringify(apiJSON.games.SURVIVAL_GAMES.players)
    let Warlords = JSON.stringify(apiJSON.games.BATTLEGROUND.players)
    let classicGames = JSON.stringify(apiJSON.games.LEGACY.players)
    let speedUHC  = JSON.stringify(apiJSON.games.SPEED_UHC.players)
    let UHC  = JSON.stringify(apiJSON.games.UHC.players)
    let prototype  = JSON.stringify(apiJSON.games.PROTOTYPE.players)
    let smashHeros  = JSON.stringify(apiJSON.games.SUPER_SMASH.players)
    let megaWalls  = JSON.stringify(apiJSON.games.WALLS3.players)
    let MCGO  = JSON.stringify(apiJSON.games.MCGO.players)
    

    const embed = new Discord.MessageEmbed()
   .setTitle(`**Player Count » ${playerCount}**`)
   .setThumbnail(`https://cdn.discordapp.com/attachments/792226377113796618/814930561671757905/AAUvwnjTWypaip_yzS5ajG97GEJ5YGSZnvan4CxFv0KZ6gs900-c-k-c0x00ffffff-no-rj.png`)
   .setColor(randomColor)
    .addFields(
    {name: `\`•\` Skyblock: **${Skyblock}** \n\`•\` Main Lobby: **${MainLobby}** \n\`•\` Bedwars: **${Bedwars}** \n\`•\` Duels: **${Duels}** \n\`•\` Build Battle: **${buildBattle}** \n\`•\` Pit: **${Pit}** \n\`•\` Housing: **${Housing}** \n\`•\` Murder Mystery: **${murderMystery}**` , value: `\u200B ` ,inline: true },
    {name:`\`•\` Tnt Games: **${TNTGAMES}** \n\`•\` Blitz: **${Blitz}**\n\`•\` Warlords: **${Warlords}**\n\`•\` Classic Games: **${classicGames}**\n\`•\` Speed UHC: **${speedUHC}**\n\`•\` UHC: **${UHC}** \n\`•\` Prototype: **${prototype}** \n\`•\` Smash Heros: **${smashHeros}**\n\`•\` Mega Walls: **${megaWalls}**\n\`•\` Cops v Crims: **${MCGO}** ` , value: `\u200B` , inline: true},
    )
    message.reply({embed});
  })
}
//name this whatever the command name is.
module.exports.help = {
  name: "hypixel"
}