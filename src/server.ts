import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { logger, loggerMiddleware } from './libs';

const server = express();

server.use(express.json());
server.use(cors());
server.use(loggerMiddleware);

const start = async () => {
  try {
    server.listen(5000, () => logger.info('Server is running on port 5000'));
  } catch (error) {
    logger.info(error);
    process.exit(1);
  }
};

export const App = { server, start };
