import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { logger, loggerMiddleware } from './libs';
import { notFoundMiddleware, errorMiddleware } from './middlewares';
import { Database } from './database';
import { routes } from './routes';

const server = express();

server.use(express.json());
server.use(cors());
server.use(loggerMiddleware);
server.use(routes);
server.use('*', notFoundMiddleware);
server.use(errorMiddleware);

const start = async () => {
  try {
    await Database.init();
    server.listen(5000, () => logger.info('Server is running on port 5000'));
  } catch (error) {
    logger.info(error);
    process.exit(1);
  }
};

export const App = { server, start };
