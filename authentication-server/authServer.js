require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const helmet = require('helmet');

const userRouter = require('./routes/userRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));


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