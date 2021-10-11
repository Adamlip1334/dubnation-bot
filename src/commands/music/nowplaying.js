const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Displays the current playing song.'),
	async execute(interaction, client) {
        if(queue.queue[interaction.guild.id]) {
            const song = queue.queue[interaction.guild.id].songs[0];
            return interaction.reply('Now playing: https://www.youtube.com/watch?v=' + song)
        } else {
            return interaction.reply('No songs are in the queue.');
        }
	}
};