const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vckick')
		.addUserOption(option => option.setName('user').setDescription('The user who you want to kick.').setRequired(true))
		.setDescription('Kick a mentioned user from a voice call.'),
	async execute(interaction, client) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({ content: '**❌ | You do not have the right permissions to kick this member.**', ephemeral: true });

		const user = interaction.options.getUser('user');
        
		if (!user) return interaction.reply({ content: '**❌ | You need to provide a valid member to kick.**', ephemeral: true });

		let findMem = await search.searchMember(interaction, user.tag);
		if (!findMem.voice.channel) return interaction.reply({ content: '**❌ | This user is not in a voice channel.**', ephemeral: true });

		let emb = new MessageEmbed()
			.setTitle(`Kick ${user.tag}`)
			.addField('Server', `**\`${interaction.guild.name}\`**`, true)
			.addField('Moderator', `**\`${interaction.member.user.tag}\`**`, true)
			.addField('User', `**\`${user.tag}\`**`, true)
			.addField('Channel', `**<#${findMem.voice.channel.id}>**`, false)
			.setThumbnail(user.displayAvatarURL())
			.setTimestamp()
			.setFooter(config.embeds.embedFooterText)
			.setColor('RED');

		try {
			findMem.voice.disconnect();
		} catch (e) {
			return interaction.reply({ content: '**❌ | I do not have the correct permissions to disconnect this member.**', ephemeral: true });
		}

		await interaction.reply({embeds: [emb], ephemeral: true});
	}
};

