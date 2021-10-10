const ytdl = require('ytdl-core');
const queue = require('../index');

const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = {
    async player (guild, channel, song) {
        const songqueue = queue.queue[guild.id];
        if (!song) {
            songqueue.connection.destroy();
            delete queue.queue[guild.id];
            return;
        }
        const player = createAudioPlayer();
        queue.queue[guild.id].player = player;
        songqueue.connection.subscribe(player);
        const stream = ytdl(song, { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        player.play(resource);
        await channel.send(`Now Playing: https://www.youtube.com/watch?v=${song}`);
        player.on(AudioPlayerStatus.Idle, () => {  
            oldsong = songqueue.songs.shift();
            if(songqueue.mode == "loop") {
                songqueue.songs.unshift(oldsong);
            } else if(songqueue.mode == "loopqueue") {
                songqueue.songs.push(oldsong);
            }
            this.player( guild, channel, songqueue.songs[0]);
        })
    }
}