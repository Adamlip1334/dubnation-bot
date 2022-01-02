const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.addUserOption(option => option.setName('user').setDescription('The user who you want to kick.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason why you are kicking the user'))
		.setDescription('Kick a mentioned user with a reason.'),
	async execute(interaction, client) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply('**❌ | You do not have the right permissions to kick this member.**');

		const user = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');

		if (!user) return interaction.reply('**❌ | You need to provide a valid member to kick.**');
		if (!reason) reason = 'No reason given.';

		let findMem = await search.searchMember(interaction, user.tag);
		if (!findMem.kickable) return interaction.reply('**❌ | I do not have the correct permissions to kick this member / this member is not kick-able.**');

		let emb = new MessageEmbed()
			.setTitle(`Kick ${user.tag}`)
			.addField('Server', `**\`${interaction.guild.name}\`**`, true)
			.addField('Moderator', `**\`${interaction.member.user.tag}\`**`, true)
			.addField('User', `**\`${user.tag}\`**`, true)
			.addField('Reason', `**\`${reason}\`**`, false)
			.setThumbnail(user.displayAvatarURL())
			.setTimestamp()
			.setFooter(config.embeds.embedFooterText)
			.setColor('RED');

		try {
			findMem.kick(reason);
		} catch (e) {
			return interaction.reply('**❌ | I do not have the correct permissions to kick this member.**');
		}

		await interaction.reply({ embeds: [emb] });
	}
};

