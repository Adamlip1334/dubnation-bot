const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
if(config.token === "setmeplease") return console.log("Set your token up! Go to https://www.discordapp.com/developers and generate a token from a bot user.");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});


bot.on("ready", () => {
  console.log(bot.user.username + " is online.")
  bot.user.setActivity('bucket\'s mom', { type: 'WATCHING' });
});

bot.on("message", async message => {
  //a little bit of data parsing/general checks
  let fixed = message.content.toLowerCase();
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return; 
  let content = fixed.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;
  
 


  //checks if message contains a command and runs it
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  else if(message.content.startsWith(prefix)){
	  message.reply('Please Enter a Command');

	  
  }
})


bot.login(config.token)
