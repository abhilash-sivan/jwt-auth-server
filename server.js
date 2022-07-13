require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const helmet = require('helmet');

const userRouter = require('./routes/userRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

//for CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Max-Age', 60 * 60 * 24 * 7);
  next();
});

app.use(express.json());

app.use(helmet());

app.use('/user', userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { API_PORT } = process.env;
const port = API_PORT || 3001;

// server listening 
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

module.exports = app;