const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const queue = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loopqueue')
    .setDescription('Loops the queue.'),
  async execute(interaction, client) {
    if (queue.queue[interaction.guild.id]) {
      if (queue.queue[interaction.guild.id].mode == 'loopqueue') {
        queue.queue[interaction.guild.id].mode = 'default';
        return interaction.reply('Disabled loop for the queue.');
      } else {
        queue.queue[interaction.guild.id].mode = 'loopqueue';
        return interaction.reply('Enabled loop for the queue.');
      }
    } else {
      return interaction.reply('No songs are playing.');
    }
  },
};
