const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List commands from the bot.'),
	async execute(interaction, client) {
        let test = 'test'
		let emb = new MessageEmbed()
			.setTitle(`Help`)
            .addField('**Help**','```Shows this help message```')
            .addField('**Avatar**','```Displays avatar of user, provides links to the avatar.```')
            .addField('**VcKick**','```Kicks user from the voice channel they are in.```')
            .addField('**Kick**','```Kicks the user from the guild.```')
            .addField('**Say**','```Repeats message given by the user in an embed.```')
			.setTimestamp()
			.setFooter(config.embeds.embedFooterText)
			.setColor('AQUA');
			await interaction.reply({embeds: [emb], ephemeral: true});
	}
};