const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../model/user')
const { body, validationResult } = require('express-validator');

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

module.exports = userRouter;