require('dotenv').config();
require('./config/database').connect();
const createServer = require('./server');

const port = process.env.API_PORT || 3001;

const app = createServer();
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

module.exports = app;