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
    let gamesList = [
      ["MAIN_LOBBY", "Main Lobby"],
      ["TOURNAMENT_LOBBY", "Tournament Lobby"],
      ["LEGACY", "Classic"],
      ["SPEED_UHC", "Speed UHC"],
      ["REPLAY", "Replays"],
      ["PROTOTYPE", "Prototype"],
      ["SUPER_SMASH", "Smash Heroes"],
      ["DUELS", "Duels"],
      ["WALLS3", "Mega Walls"],
      ["BEDWARS", "BedWars"],
      ["PIT", "The Pit"],
      ["UHC", "UHC"],
      ["SKYWARS", "SkyWars"],
      ["SKYBLOCK", "SkyBlock"],
      ["BUILD_BATTLE", "Build Battle"],
      ["MCGO", "CvC"],
      ["BATTLEGROUND", "Warlords"],
      ["MURDER_MYSTERY", "Murder Mystery"],
      ["TNTGAMES", "TNT Games"],
      ["ARCADE", "Arcade"],
      ["HOUSING", "Housing"],
      ["SURVIVAL_GAMES", "Blitz SG"],
      ["LIMBO", "Limbo"],
      ["IDLE", "Idle"],
      ["QUEUE", "Queue"]
    ];
    let gameCount = [];
    for(game of gamesList){
      gameCount.push([game[1], apiJSON.games[game[0]].players]);
    }
    gameCount.sort(function(a, b) {
        return b[1] - a[1];
    });
    gameCount = gameCount.filter(entry => entry[1] != 0);
    let playerCount = JSON.stringify(apiJSON.playerCount)
    

    const embed = new Discord.MessageEmbed()
   .setTitle(`**Player Count » ${playerCount}**`)
   .setThumbnail(`https://cdn.discordapp.com/attachments/792226377113796618/814930561671757905/AAUvwnjTWypaip_yzS5ajG97GEJ5YGSZnvan4CxFv0KZ6gs900-c-k-c0x00ffffff-no-rj.png`)
   .setColor(randomColor)
    for(game of gameCount){
      embed.addField(game[0], game[1], true);
    }
    message.reply({embed});
  })
}
//name this whatever the command name is.
module.exports.help = {
  name: "hypixel"
}
