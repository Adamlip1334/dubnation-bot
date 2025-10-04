const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.'),
  async execute(interaction) {
    if (queue.queue[interaction.guild.id].player) {
      queue.queue[interaction.guild.id].player.stop(true);
      return interaction.reply('Song has been skipped.');
    } else {
      return interaction.reply('No song is playing.');
    }
  },
};
