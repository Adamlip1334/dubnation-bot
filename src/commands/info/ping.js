const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Displays the latency of the bot to discord.'),
	async execute(interaction, client) {
		let emb = new MessageEmbed()
			.addField('**Ping**', `🏓 Bots latency is ${client.ws.ping}ms.`)
			.addField('**Ping**', `🏓 Your latency is ${Date.now() - interaction.createdTimestamp}ms.`)
			.setTimestamp()
			.setFooter({ text: config.embeds.embedFooterText })
			.setColor('AQUA');
		await interaction.reply({ embeds: [emb], ephemeral: true });
	}
};




