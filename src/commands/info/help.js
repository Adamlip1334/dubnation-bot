const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List commands from the bot.'),
	async execute(interaction, client) {
		let emb = new MessageEmbed()
			.setTitle(`Help`)
            .addField('**Help**','```Shows this help message```')
            .addField('**Avatar**','```Displays avatar of user, provides links to the avatar.```')
            .addField('**VcKick**','```Kicks user from the voice channel they are in.```')
			.addField('**Ping**','```Displays the latency of the bot.```')
            .addField('**Kick**','```Kicks the user from the guild.```')
            .addField('**Say**','```Repeats message given by the user in an embed.```')
			.addField('**Play**','```Plays a specified song.```')
			.addField('**Clear**','```Clears the song queue.```')
			.addField('**Leave**','```Stops playing songs and leaves.```')
			.addField('**Loop**','```Loops the currently playing song.```')
			.addField('**LoopQueue**','```Loops the queue.```')
			.addField('**NowPlaying**','```Displays the current playing song.```')
			.addField('**Pause**','```Pauses/unpauses the current song.```')
			.addField('**Queue**','```Displays the song queue.```')
			.addField('**Skip**','```Skips the current song.```')
			.addField('**8ball**','```Asks the magical 8 ball a question.```')
			.addField('**Shuffle**','```Shuffles the currently playing songs.```')
			.addField('**PlayNext**','```Plays the provided song next in the queue.```')
			.addField('**Sim**', '```Simulates a given user.```')
			.setTimestamp()
			.setFooter(config.embeds.embedFooterText)
			.setColor('AQUA');
			await interaction.reply({embeds: [emb], ephemeral: true});
	}
};