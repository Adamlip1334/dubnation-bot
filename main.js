const Discord = require("discord.js")
const bot = new Discord.Client();
const chalk = require('chalk');
const fs = require("fs");
bot.commands = new Discord.Collection();

const SUCCESS = chalk.hex('#43B581'); 
const INFO = chalk.hex('#FF73FA');
const LOG = chalk.hex('#44DDBF');

let token = '';
let prefix = '';
let api = '';
if (fs.existsSync('./config.json')) {
	const tokenFile = require('./config.json');
	token = tokenFile.token;
  prefix = tokenFile.prefix;
  api = tokenFile["api-key"];
} else {
	token = process.env.token;
  prefix = process.env.prefix;
  api = process.env.api;
}

let originalConsoleLog = console.log;
console.log = function () {
    args = [];
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    args.push(`${LOG(`[LOG]`)} ${INFO(`[${day}/${month}/${year} | ${hours}:${minutes}:${seconds} UTC]`)}`);
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    originalConsoleLog.apply(console, args);
}

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
  console.log(SUCCESS(`${message.author.tag}: ${message.content}`));
  
 


  //checks if message contains a command and runs it
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  else if(message.content.startsWith(prefix)){
	  message.reply('Please Enter a Command');

	  
  }
})


bot.login(token)

exports.tokens = function getTokens() {
	return {
		token: token,
		prefix: prefix, 
		 api: api
	}
}
