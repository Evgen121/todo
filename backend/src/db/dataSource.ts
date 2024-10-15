import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as E from './entities/index';

dotenv.config({ path: '.env' });
console.log(process.env.DATABASE_URL);
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: Object.values(E),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  migrations: ['./src/db/migrations/*.ts'],
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });
