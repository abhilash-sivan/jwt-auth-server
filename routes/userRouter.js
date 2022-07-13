const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../model/user')
const { body, validationResult } = require('express-validator');
const auth = require('./../middleware/auth');
const { parseJwt } = require('./../helper/parseJWT');

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

			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.SECRET_KEY,
				{
					expiresIn: '1h',
				}
			);

			// return token to the user
			res.status(201).json({
				id: user._id,
				token: token
			});
		} catch (err) {
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
			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.SECRET_KEY,
				{
					expiresIn: '1h',
				}
			);

			// user
			res.status(200).json({id: user._id, token: token});
		} else {
			res.status(400).send('Invalid Credentials');
		}
	} catch (err) {
		console.log(err);
	}
});

userRouter.get('/getProfile', auth, (req, res) => {

	// get token from request
	let token = req.token;

	//parse jwt to get email
	let email =  parseJwt(token).email;

	//fetch the profile details
	User.findOne({email: email})
		.then(user => {
			//destructuring the data
			let {firstName, lastName, email} = user;
			let result = {firstName, lastName, email};
			res.status(200).json({
				result
			});
		}).catch(err => {
			res.status(400).send(err);
		})
});

module.exports = userRouter;