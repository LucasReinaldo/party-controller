const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
	host,
	port,
	auth: {
		user,
		pass,
	},
});

transport.use(
	'compile',
	hbs({
		// viewEngine: 'handlebars',
		// viewPath: path.resolve('./server/utils/mail/'),
		// extName: '.html',
		viewEngine: {
			defaultLayout: 'auth/forgot_password.html',
			extName: '.html',
			layoutsDir: path.resolve('./utils/mail/'),
			partialsDir: path.resolve('./utils/mail/'),
		},
		extName: '.html',
		viewPath: path.resolve('./utils/mail/'),
	})
);

module.exports = transport;
