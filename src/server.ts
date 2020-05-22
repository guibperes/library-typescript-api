import express from 'express';
import 'express-async-errors';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

const start = async () => {
  try {
    server.listen(5000, () => console.log('Server is running on port 5000'));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const App = { server, start };
