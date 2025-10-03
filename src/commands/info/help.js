const config = require('../../../config');
const {
  SlashCommandBuilder,
  SlashCommandStringOption,
} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List commands from the bot.')
    .addStringOption(
      new SlashCommandStringOption()
        .setName('category')
        .setDescription('The category to get help for.')
        .setRequired(true)
        .addChoices(
          { name: 'general', value: 'general' },
          { name: 'music', value: 'music' },
        ),
    ),
  async execute(interaction, client) {
    const category = interaction.options.getString('category');
    if (category === 'general') {
      let emb = new MessageEmbed()
        .setTitle(`Help`)
        .addField('**Help**', '```Shows this help message```')
        .addField(
          '**Avatar**',
          '```Displays avatar of user, provides links to the avatar.```',
        )
        .addField(
          '**VcKick**',
          '```Kicks user from the voice channel they are in.```',
        )
        .addField(
          '**VcKickAll**',
          '```Kicks all users from the voice channel specified.```',
        )
        .addField(
          '**RandomVcKick**',
          '```Kicks a random user in the voice channel specified.```',
        )
        .addField('**Ping**', '```Displays the latency of the bot.```')
        .addField('**Kick**', '```Kicks the user from the guild.```')
        .addField(
          '**Say**',
          '```Repeats message given by the user in an embed.```',
        )
        .addField('**8ball**', '```Asks the magical 8 ball a question.```')
        .addField('**Sim**', '```Simulates a given user.```')
        .setTimestamp()
        .setFooter({ text: config.embeds.embedFooterText })
        .setColor('AQUA');
      await interaction.reply({ embeds: [emb], ephemeral: true });
    } else {
      let emb = new MessageEmbed()
        .setTitle(`Help`)
        .addField('**Play**', '```Plays a specified song.```')
        .addField('**Clear**', '```Clears the song queue.```')
        .addField('**Leave**', '```Stops playing songs and leaves.```')
        .addField('**Loop**', '```Loops the currently playing song.```')
        .addField('**LoopQueue**', '```Loops the queue.```')
        .addField('**NowPlaying**', '```Displays the current playing song.```')
        .addField('**Pause**', '```Pauses/unpauses the current song.```')
        .addField('**Queue**', '```Displays the song queue.```')
        .addField('**Skip**', '```Skips the current song.```')
        .addField('**Shuffle**', '```Shuffles the currently playing songs.```')
        .addField(
          '**PlayNext**',
          '```Plays the provided song next in the queue.```',
        )
        .setTimestamp()
        .setFooter({ text: config.embeds.embedFooterText })
        .setColor('AQUA');
      await interaction.reply({ embeds: [emb], ephemeral: true });
    }
  },
};
