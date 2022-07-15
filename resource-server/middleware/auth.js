const jwt = require('jsonwebtoken');

const config = process.env;

// Verify token for authorization
const authenticateUser = (req, res, next) => {
	const bearerToken = req.header('authorization');

	if (!bearerToken) {
		return res.status(403).send('A token is required for authentication');
	}

	const token = bearerToken && bearerToken.split(' ')[1] || bearerToken;

	try {
		const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};

module.exports = authenticateUser;