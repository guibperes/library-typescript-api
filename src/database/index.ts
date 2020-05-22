import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Book } from '../app/book';

const init = () =>
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '112233',
    database: 'library',
    logging: true,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [Book],
  });

export const Database = { init };
