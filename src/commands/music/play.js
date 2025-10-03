const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const queue = require('../../index');
const songplayer = require('../../modules/player');
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnectionStatus,
  entersState,
} = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('The song you wish to play.')
        .setRequired(true),
    )
    .setDescription('Play a specified song.'),
  async execute(interaction, client) {
    const url = interaction.options.get('song').value;
    var regExp =
      /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/;
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
    let findMem = await search.searchMember(interaction, interaction.user.tag);
    if (!findMem.voice.channel)
      return interaction.reply({
        content: '**❌ | You are not in a voice channel.**',
      });

    if (!queue.queue[interaction.guild.id]) {
      const connection = joinVoiceChannel({
        channelId: findMem.voice.channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      connection.on(
        VoiceConnectionStatus.Disconnected,
        async (oldState, newState) => {
          try {
            await Promise.race([
              entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
              entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
            ]);
          } catch (error) {
            connection.destroy();
            delete queue.queue[interaction.guild.id];
          }
        },
      );
      queue.queue[interaction.guild.id] = {
        mode: 'default',
        connection: connection,
        songs: [song],
      };
      songplayer.player(interaction.guild, interaction.channel, song);
      return interaction.reply('Added to the queue.');
    } else {
      queue.queue[interaction.guild.id].songs.push(song);
      return interaction.reply(
        'Song https://www.youtube.com/watch?v=' +
          song +
          ' has been added to the queue.',
      );
    }
  },
};
