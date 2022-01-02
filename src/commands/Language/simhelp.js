const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('simhelp')
		.setDescription('Provides options for /sim.'),
	async execute(interaction, client) {
		let emb = new MessageEmbed()
			.setTitle(`Sim Help`)
            .addField('Options can be found here:', 'https://observablehq.com/@spencermountain/compromise-tags')
            .setTimestamp()
			.setFooter(config.embeds.embedFooterText)
			.setColor('AQUA');
		await interaction.reply({embeds: [emb]});
	}
};