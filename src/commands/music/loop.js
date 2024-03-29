const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const queue = require('../../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loops the currently playing song.'),
	async execute(interaction, client) {
		if (queue.queue[interaction.guild.id]) {
			if (queue.queue[interaction.guild.id].mode == "loop") {
				queue.queue[interaction.guild.id].mode = "default";
				return interaction.reply('Disabled loop.')
			} else {
				queue.queue[interaction.guild.id].mode = "loop";
				return interaction.reply('Enabled loop.')
			}
		} else {
			return interaction.reply('No songs are playing.')
		}
	}
};