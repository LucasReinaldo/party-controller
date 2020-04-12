const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.header('Authorization');

	if (!authHeader) {
		return res.status(401).json({
			err: 'No token provided. Please check your credentials.',
		});
	}

	const auth_split = authHeader.split(' ');

	if (!auth_split.length === 2) {
		return res.status(401).json({
			err: 'Token error. Please check your credentials.',
		});
	}

	const [scheme, token] = auth_split;

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({
			err: 'Token error (format). Please check your credentials.',
		});
	}

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err)
			return res.status(401).json({
				err: 'Invalid Token. Please check your credentials.',
			});

		//decoded get the id in: generate_token({id: user.id})
		req.userId = decoded.params.id;

		next();
	});
};
