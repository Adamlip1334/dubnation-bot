const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.'),
  async execute(interaction, client) {
    if (queue.queue[interaction.guild.id].player) {
      queue.queue[interaction.guild.id].player.stop(true);
      return interaction.reply('Song has been skipped.');
    } else {
      return interaction.reply('No song is playing.');
    }
  },
};
