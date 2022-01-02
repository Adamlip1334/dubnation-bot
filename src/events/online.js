module.exports = {
	name: 'ready',
	once: true,
	async execute() {
		console.log('Bot is logged in'.green);
	}
};