const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears the song queue.'),
	async execute(interaction, client) {
        if(queue.queue[interaction.guild.id]) {
            queue.queue[interaction.guild.id].songs = [];
            return interaction.reply('Queue cleared');
        } else {
            return interaction.reply('No songs are in the queue.');
        }
	}
};