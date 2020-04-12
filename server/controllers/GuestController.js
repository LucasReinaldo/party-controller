const Guest = require('../models/GuestSchema');

module.exports = {
	async index(req, res) {
		const guests = await Guest.find({ user: req.userId });

		return res.json(guests);
	},

	async indexById(req, res) {
		const guests = await Guest.findById(req.params.id);

		return res.json(guests);
	},

	async store(req, res) {
		try {
			const { fullName, isConfirmed, dietary, phoneNumber, email } = req.body;

			const guest = await Guest.create({
				user: req.userId,
				fullName,
				isConfirmed,
				dietary,
				phoneNumber,
				email,
			});

			return res.json(guest);
		} catch (err) {
			return res.json(err);
		}
	},

	async update(req, res) {
		try {
			const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});

			return res.json(guest);
		} catch (err) {
			return res.json(err);
		}
	},

	async destroy(req, res) {
		try {
			await Guest.findByIdAndDelete(req.params.id);
			const guest = await Guest.find();

			return res.json(guest);
		} catch (err) {
			return res.json(err);
		}
	},
};
