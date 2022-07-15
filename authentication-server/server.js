const express = require('express');
const userRouter = require('./routes/userRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const helmet = require('helmet');
const cors = require('cors');

function createServer() {
  const app = express();
  const corsOptions = {
    origin: '*'
  };
  app.use(express.json());
  app.use(helmet());

  app.use(cors(corsOptions));
  app.use('/user', userRouter);

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return app;
}

module.exports = createServer;