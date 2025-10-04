const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Displays the current playing song.'),
  async execute(interaction) {
    if (queue.queue[interaction.guild.id]) {
      const song = queue.queue[interaction.guild.id].songs[0];
      return interaction.reply(
        'Now playing: https://www.youtube.com/watch?v=' + song,
      );
    } else {
      return interaction.reply('No songs are in the queue.');
    }
  },
};
