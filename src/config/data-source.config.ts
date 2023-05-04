import { DataSource } from 'typeorm';
import databaseConfig from './database.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const AppDataSource = new DataSource(databaseConfig() as any);
