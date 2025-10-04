const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Stops playing songs and leaves.'),
  async execute(interaction) {
    if (queue.queue[interaction.guild.id]) {
      queue.queue[interaction.guild.id].connection.destroy();
      delete queue.queue[interaction.guild.id];
      return interaction.reply('Leaving.');
    } else {
      return interaction.reply('No song is playing.');
    }
  },
};
