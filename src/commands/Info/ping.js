const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Displays the latency of the bot to discord.'),
	async execute(interaction, client) {
		let emb = new MessageEmbed()
            .addField('**Ping**',`🏓 Latency is ${client.ws.ping}ms.`)
			.setTimestamp()  
			.setFooter(config.embeds.embedFooterText)
			.setColor('AQUA');
			await interaction.reply({embeds: [emb], ephemeral: true});
	}
};




