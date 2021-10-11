const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');
const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses/unpauses the current playing song.'),
	async execute(interaction, client) {
        if(queue.queue[interaction.guild.id].player) {
            if(queue.queue[interaction.guild.id].player.state.status == AudioPlayerStatus.Paused) {
                queue.queue[interaction.guild.id].player.unpause();
                return interaction.reply('Song has been unpaused.');
            } else {
                queue.queue[interaction.guild.id].player.pause();
                return interaction.reply('Song has been paused.');
            }
        } else {
            return interaction.reply('No song is playing.');
        }
	}
};