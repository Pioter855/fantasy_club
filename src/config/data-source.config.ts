import { DataSource } from 'typeorm';
import databaseConfig from './database.config';
require('dotenv').config();

export const AppDataSource = new DataSource(databaseConfig() as any);
