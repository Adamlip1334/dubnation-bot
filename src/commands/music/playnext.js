const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require('../../index');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const play = require('./play');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playnext')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('The song you wish to play.')
        .setRequired(true),
    )
    .setDescription('Plays the provided song next in the queue.'),
  async execute(interaction) {
    if (queue.queue[interaction.guild.id]) {
      const url = interaction.options.get('song').value;
      var regExp =
        /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s?]+)/;
      var match = url.match(regExp);
      let song;
      if (match && match[1].length == 11) {
        song = match[1];
      } else {
        let songs = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${process.env.YTAPI}&maxResults=1&type=video&q=${interaction.options.get('song').value}`,
        ).then((response) => response.json());
        if (!songs.items[0]) {
          return interaction.reply('**❌ | Video not found.**');
        }
        song = songs.items[0].id.videoId;
      }
      queue.queue[interaction.guild.id].songs.splice(1, 0, song);
      return interaction.reply(
        'Song https://www.youtube.com/watch?v=' +
          song +
          ' has been added to the queue.',
      );
    } else {
      play.execute(interaction);
    }
  },
};
