const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vckickall')
    .addChannelOption((option) =>
      option
        .addChannelTypes(2)
        .setName('channel')
        .setDescription('The channel to kick from.')
        .setRequired(true),
    )
    .setDescription('Kick a random user from a voice call.'),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return await interaction.reply({
        content:
          '**❌ | You do not have the right permissions to kick from this channel.**',
        ephemeral: true,
      });

    if (interaction.member.id === '379345497309315074')
      return await interaction.reply({ content: 'You are Abishek' });

    const channel = await interaction.options.getChannel('channel');

    if (!channel)
      return await interaction.reply({
        content: '**❌ | You need to provide a valid channel.**',
        ephemeral: true,
      });

    let members = [...channel.members.values()];

    if (!members.length)
      return await interaction.reply({
        content: '**❌ | There are no users in that voice channel.**',
        ephemeral: true,
      });

    for (const member of members) {
      try {
        await member.voice.disconnect();
      } catch (e) {
        return await interaction.reply({
          content:
            '**❌ | I do not have the correct permissions to disconnect this member.**',
          ephemeral: true,
        });
      }
    }

    let emb = new MessageEmbed()
      .setTitle(`Kicked members`)
      .addField('Server', `**\`${interaction.guild.name}\`**`, true)
      .addField('Moderator', `**\`${interaction.member.user.tag}\`**`, true)
      .addField('Users', `**\`${members.length}\`**`, true)
      .addField('Channel', `**<#${channel.id}>**`, false)
      .setTimestamp()
      .setFooter({ text: config.embeds.embedFooterText })
      .setColor('RED');

    await interaction.reply({ embeds: [emb], ephemeral: true });
  },
};
