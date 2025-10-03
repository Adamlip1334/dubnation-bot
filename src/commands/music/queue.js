const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays the song queue.'),
  async execute(interaction, client) {
    if (
      queue.queue[interaction.guild.id] &&
      queue.queue[interaction.guild.id].songs.length > 0
    ) {
      const list = queue.queue[interaction.guild.id].songs;
      let emb = new MessageEmbed().setTitle(`Song Queue (${list.length})`);
      for (let i = 0; i < list.length; i++) {
        emb.addField(i + 1 + '.', 'https://www.youtube.com/watch?v=' + list[i]);
      }
      emb
        .setTimestamp()
        .setFooter({ text: config.embeds.embedFooterText })
        .setColor('AQUA');
      await interaction.reply({ embeds: [emb] });
    } else {
      return interaction.reply('No songs are in the queue.');
    }
  },
};
