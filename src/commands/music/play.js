const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.addStringOption(option => option.setName('song').setDescription('The song you wish to play.').setRequired(true))
		.setDescription('Play a specified song.'),
	async execute(interaction, client) {
        const url = interaction.options.get('song').value;
        var regExp = /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/;
        var match = url.match(regExp);
        let song;
        if (match && match[1].length == 11) {
            song = match[1];
        } else {
            let songs = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YTAPI}&maxResults=1&type=video&q=${interaction.options.get('song').value}`).then(response => response.json());
            if(!songs.items[0]) {
                return interaction.reply('**❌ | Video not found.**')
            }
            song = songs.items[0].id.videoId;
        }
        let findMem = await search.searchMember(interaction, interaction.user.tag);
		if (!findMem.voice.channel) return interaction.reply({ content: '**❌ | You are not in a voice channel.**' });
        const connection = joinVoiceChannel({
            channelId: findMem.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        const stream = ytdl(song, { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();
        
        player.play(resource);
        connection.subscribe(player);
        
        player.on(AudioPlayerStatus.Idle, () => connection.destroy());

        return interaction.reply('Now playing: https://www.youtube.com/watch?v=' + song);
	}
};