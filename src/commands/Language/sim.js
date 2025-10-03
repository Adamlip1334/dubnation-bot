const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('../../index').db;
const nlp = require('compromise/one');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sim')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you wish to simulate.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('format')
        .setDescription('See /simhelp for help on formatting.')
        .setRequired(true),
    )
    .setDescription('Simulates the given user.'),
  async execute(interaction, client) {
    await interaction.deferReply();
    let user = interaction.options.getUser('user');
    let format = interaction.options.getString('format');
    let messages = await db.db('messages').collection(user.id).find().next();
    delete messages['_id'];
    let newText = '';
    for (const word of format.split(' ')) {
      if (word.startsWith('#')) {
        newText += nlp(randomizeString(messages)).matchOne(word).text() + ' ';
      } else {
        newText += word + ' ';
      }
    }
    let emb = new MessageEmbed()
      .setTitle(`${user.tag}`)
      .setImage(user.displayAvatarURL())
      .setFooter({ text: newText.substring(0, 2000) })
      .setColor('AQUA');
    await interaction.editReply({ embeds: [emb] });
  },
};

function randomizeString(object) {
  let text = '';
  for (const [key, value] of Object.entries(object)) {
    text += (key + ' ').repeat(value);
  }
  arr = text.slice(0, -1).split(' ');
  shuffle(arr);
  text = '';
  for (const word of arr) {
    text += word + ' ';
  }
  return text.slice(0, -1);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
