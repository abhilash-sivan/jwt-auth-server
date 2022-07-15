
require('dotenv').config();

const express = require('express');
const authenticateUser = require('./middleware/auth');
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(express.json());

// the authenticate middleware verifies the integrity of the token
app.get('/', authenticateUser, (req, res) => {
  res.status(200).json({ message: 'Authentication succesfull and resource can be accessed' });
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.RESOURCE_SERVER_API_PORT || 4000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});