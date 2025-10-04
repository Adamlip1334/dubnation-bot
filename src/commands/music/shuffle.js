const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles the songs in the queue.'),
  async execute(interaction) {
    if (queue.queue[interaction.guild.id]) {
      let arr = queue.queue[interaction.guild.id].songs;
      for (let i = arr.length - 1; i > 1; i--) {
        let swap = Math.floor(Math.random() * i) + 1;
        var temp = arr[i];
        arr[i] = arr[swap];
        arr[swap] = temp;
      }
      queue.queue[interaction.guild.id].songs = arr;
      return interaction.reply('Shuffled queue.');
    } else {
      return interaction.reply('No songs are playing.');
    }
  },
};
