const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../model/user')
const { body, validationResult } = require('express-validator');
const app = require('../authServer');


// Generates an access token valid for 2 minutes
function getAccessToken(payload) {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
}

userRouter.post('/register',
	body('email').isEmail(),
	body('password').isLength({ min: 8 }),
	body('lastName').isLength({ min: 3 }),
	async (req, res) => {

		try {

			// Get user input
			const { firstName, lastName, email, password } = req.body;

			// Validate user input
			if (!(email && password && firstName && lastName)) {
				res.status(400).send('All inputs are required');
			}

			// Get validation errors if any
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// check if user already exist
			// Validate if user exist in the database
			const oldUser = await User.findOne({ email });

			if (oldUser) {
				return res.status(409).send('User Already Exist. Please Login');
			}

			//Encrypt user password
			encryptedPassword = await bcrypt.hash(password, 10);

			// Create user in the database
			const user = await User.create({
				firstName,
				lastName,
				email: email,
				password: encryptedPassword,
			});

			// return token to the user
			res.status(201).json({ message: 'Registration succesful' });
		} catch (err) {
			res.status(500).json({ message: 'Internal Error. Registration failed' })
			console.log(err);
		}
	});

userRouter.post('/login',
	body('email').isEmail(),
	async (req, res) => {

		try {
			// Get user input
			const { email, password } = req.body;

			// Validate user input
			if (!(email && password)) {
				res.status(400).send('All input is required');
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json("Invalid Email");
			}

			// Validate if user exist in our database
			const user = await User.findOne({ email });

			//create new token
			if (user && (await bcrypt.compare(password, user.password))) {

				const payload = { id: user._id, sub: email }
				const accessToken = getAccessToken(payload);

				// Create refresh token
				const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

				// Store the refresh token in user DB
				User.updateOne({ email: email }, { 'token': refreshToken }).then(() => {
					res.status(200).json({ 'message': 'Logged in succesfully', 'AccessToken': accessToken, 'RefreshToken': refreshToken });
				});

			} else {
				res.status(400).send('Invalid Credentials');
			}
		} catch (err) {
			console.log(err);
		}
	});

// accepts the refreshtoken and provide a new accesstoken
userRouter.get('/token', (req, res) => {
	const authHeader = req.headers['authorization'];
	// takes out token from Bearer Token
	const token = authHeader && authHeader.split(' ')[1] || authHeader;

	if (!token) {
		res.json({ message: 'Invalid refresh token' });
	}

	//verifying token integrity before checking in DB
	jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
		const payload = { id: data.id, sub: data.sub };

		if (err) {
			res.json({ message: 'Some error occured' });
		} else {
			User.findOne({ 'token': token }, (err, usr) => {
				if (err) {
					res.json({ message: 'Some error occured' });
				} else if (usr) {
					const accessToken = getAccessToken(payload);
					res.json({ AccessToken: accessToken, message: 'This is new access token' });
				} else {
					res.json({ message: 'Some error occured' });
				}
			});
		}
	});
});

userRouter.post('/logout', (req, res) => {
	const authHeader = req.headers['authorization'];
	// takes out token from Bearer Token
	const token = authHeader && authHeader.split(' ')[1] || authHeader;

	if (!token) {
		res.status(401).json({ message: 'Invalid refresh token' });
	}

	try {
		User.findOne({ 'token': token }, (err, usr) => {
			if (err) {
				res.json({ message: 'Some error occured' });
			} else if (usr) {
				User.updateOne({ 'token': token }, { token: null }).then(user => {
					console.log(user)
					res.json({ message: 'Logged out successfully' });
				});
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Some error occured' });
	}

});

module.exports = userRouter;