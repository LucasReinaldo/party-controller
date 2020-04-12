const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
const User = require('../models/UserSchema');
const generate_token = require('../utils/generate_token');

module.exports = {
	async auth(req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({
				email,
			}).select('+password');

			if (!user) {
				return res.status(400).json({
					msg: 'USER NOT FOUND: Invalid Credentials. Please try again.',
				});
			}

			if (!(await bcrypt.compare(password, user.password))) {
				return res.status(400).json({
					msg: 'NOT MATCH: Invalid Credentials. Please try again.',
				});
			}

			user.password = undefined;

			return res.json({
				user,
				token: generate_token({
					id: user.id,
				}),
			});
		} catch (err) {
			return res.status(500).json({
				err: 'Server Error',
			});
		}
	},

	async store(req, res) {
		try {
			const { username, email } = req.body;

			let userMail = await User.findOne({
				email,
			});
			const userName = await User.findOne({
				username,
			});

			if (userMail || userName) {
				return res.status(400).json({
					msg:
						'User already exists. Please try again with a new username or email.',
				});
			}

			const user = await User.create(req.body);

			user.password = undefined;

			return res.json({
				user,
				token: generate_token({
					id: user.id,
				}),
			});
		} catch (err) {
			return res.status(500).json({
				err: 'Server Error',
			});
		}
	},

	async forgotPassword(req, res) {
		const { email } = req.body;
		try {
			const user = await User.findOne({
				email,
			});

			if (!user) {
				return res.status(400).json({
					msg: 'User not found. Please try again.',
				});
			}

			const token = crypto.randomBytes(20).toString('hex');

			const limitTokenTime = new Date();
			limitTokenTime.setHours(limitTokenTime.getHours() + 1); //one hour expiration token.

			await User.findByIdAndUpdate(user.id, {
				$set: {
					passwordResetToken: token,
					passwordResetExpires: limitTokenTime,
				},
			});

			mailer.sendMail(
				{
					to: email,
					from: 'lucasreinaldo.demelo@hotmail.com',
					template: 'auth/forgot_password',
					subject: 'Password Reset Confirmation',
					context: { token },
				},
				(err) => {
					if (err) {
						return res.status(400).json({
							msg: 'Error on forgot password email. Please try again.',
						});
					}
					return res.status(200).send();
				}
			);
		} catch (err) {
			return res.status(400).json({
				err: 'Error on forgot password. Please try again.',
			});
		}
	},

	async resetPassword(req, res) {
		const { email, token, password } = req.body;
		try {
			const user = await User.findOne({
				email,
			}).select('+passwordResetToken passwordResetExpires');

			if (!user) {
				return res.status(400).json({
					msg: 'User not found. Please try again.',
				});
			}

			if (token !== user.passwordResetToken) {
				return res
					.status(400)
					.json({ msg: 'Token invalid. Please try again.' });
			}

			const timeNow = new Date();

			if (timeNow > user.passwordResetExpires) {
				return res
					.status(400)
					.json({ msg: 'Token exprired. Please try again.' });
			}

			user.password = password;

			user.save();

			res.status(200).send();
		} catch (err) {
			return res.status(400).json({
				err: 'Error on reset password. Please try again.',
			});
		}
	},
};
