require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const helmet = require('helmet');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());

app.use(helmet());

app.use('/user', userRouter);

const { API_PORT } = process.env;
const port = API_PORT || 3001;

// server listening 
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

module.exports = app;