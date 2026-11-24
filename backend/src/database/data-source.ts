import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as Entities from './entities';

// Load .env when running TypeORM CLI outside NestJS
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config();
} catch {
  // dotenv is optional if env vars are injected by the shell/runtime
}

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'gelavu_db',
  entities: Object.values(Entities).filter((item) => typeof item === 'function'),
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: ['error', 'warn', 'schema'],
});

export default AppDataSource;
