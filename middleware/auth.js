const jwt = require('jsonwebtoken');

const config = process.env;

// Verify token for authorization
const verifyToken = (req, res, next) => {
	const bearerToken = req.header('authorization');

	if (!bearerToken) {
		return res.status(403).send('A token is required for authentication');
	}

	const token = bearerToken.split(' ')[1] || null;

	try {
		const decoded = jwt.verify(token, config.SECRET_KEY);
		req.user = decoded;
		req.token = token;
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};

module.exports = verifyToken;