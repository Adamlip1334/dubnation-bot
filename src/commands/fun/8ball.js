const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .addStringOption(option => option.setName('question').setDescription('Question to ask the magical 8 ball'))
        .setDescription('Asks the magical 8 ball a question'),
    async execute(interaction, client) {
        const question = interaction.options.getString('question');
            
        if (!question) {
            return interaction.reply('You need to ask a question!');
        }       
        const reponse = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.',
            'Ask Ibby.'
        ];
        let randomResponse = reponse[Math.floor(Math.random() * reponse.length)];
        await interaction.reply(`You asked: ${question}\n${randomResponse}`);
	}
};