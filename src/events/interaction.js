module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} used a command ${interaction.commandName}`.blue);
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction, interaction.client);
		} catch (error) {
			console.log(`${error}`);
			await interaction.reply(
				{
					content: 'There was an error executing this command.',
					ephmeral: true
				}
			);
		}
	}
};