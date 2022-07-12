const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

// mongodb connection
exports.connect = () => {
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true
		})
		.then(() => {
			console.log('successfully connected to database');
		})
		.catch((error) => {
			console.log('database connection failed. exiting now...', error);
			process.exit(1);
		});
};