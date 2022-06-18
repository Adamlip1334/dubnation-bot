const db = require('../index').db;
module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		if (message.author.bot) {
			return;
		}
		words = message.content.toLowerCase().replace(/['.?,!]/g, "").replace(/\s+/g, " ").split(" ").reduce(function (obj, name) {
			if (!/^[a-z]+$/.test(name))
				return obj;
			obj[name] = obj[name] ? ++obj[name] : 1;
			return obj;
		}, {});
		if (Object.keys(words).length == 0) {
			return;
		}
		set = {
			$inc: words
		}
		await db.db('messages').collection(message.author.id).updateOne({}, set, { upsert: true }).catch((error) => {
			console.log(error);
		});
	}
};