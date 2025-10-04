const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .addStringOption((option) =>
      option
        .setName('say')
        .setDescription('The sentence you want to say.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('The title for your announcement.'),
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel you want to say this in.'),
    )
    .setDescription('Say something in a channel.'),
  async execute(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return interaction.reply(
        '**❌ | You do not have the right permissions to use this command.**',
      );

    let emb = new MessageEmbed().setTimestamp().setColor('AQUA').setFooter({
      text: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL(),
    });

    let say = interaction.options.getString('say');
    let title = interaction.options.getString('title');
    let channel = interaction.options.getChannel('channel');

    if (!say)
      return interaction.reply(
        '**❌ | You need to provide something to say.**',
      );
    else emb.setDescription(say);

    if (title) emb.setTitle(title);
    if (!channel) {
      interaction.channel.send({ embeds: [emb] });
    } else {
      channel.send({ embeds: [emb] });
    }
    return await interaction.reply({
      content: 'Message sent',
      ephemeral: true,
    });
  },
};
