const User = require('../models/UserSchema');

module.exports = {
	async index(req, res) {
		const users = await User.find();

		return res.json(users);
	},

	async indexById(req, res) {
		const user = await User.findById(req.userId);

		return res.json(user);
	},

	async destroy(req, res) {
		try {
			await User.findByIdAndDelete(req.params.id);
			const user = await User.find();

			return res.json(user);
		} catch (err) {
			return res.json(err);
		}
	},
};
