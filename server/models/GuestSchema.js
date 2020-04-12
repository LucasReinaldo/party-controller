const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
		fullName: {
			type: String,
			required: true,
			trim: true, //remover the space at the end
		},
		isConfirmed: {
			type: Boolean,
			default: false,
		},
		dietary: {
			type: String,
			required: true,
			trim: true,
			default: 'Non-Veg',
		},
		phoneNumber: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;
