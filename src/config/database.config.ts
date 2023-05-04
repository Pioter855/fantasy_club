import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { registerAs } from '@nestjs/config';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    synchronize: false,
    migrations: [__dirname + '/../migrations/*.js'],
    migrationsTableName: 'migrations_typeorm_fantasy',
    migrationsRun: true,
    retryAttempts: 5,
    retryDelay: 2000,
    logging: false,
  };
});
