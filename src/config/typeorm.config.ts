import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as path from 'path';

export function getTypeOrmConfig(): TypeOrmModuleOptions {
  const isTest = process.env.NODE_ENV === 'test';

  return {
    type: isTest ? 'sqlite' : 'postgres',
    database: isTest ? ':memory:' : process.env.DB_DBNAME,
    host: isTest ? undefined : process.env.DB_HOST,
    port: isTest ? undefined : Number(process.env.DB_PORT),
    username: isTest ? undefined : process.env.DB_USERNAME,
    password: isTest ? undefined : process.env.DB_PASSWORD,
    entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: isTest,
    dropSchema: isTest,
  };
}
export const dataSource = new DataSource(getTypeOrmConfig() as any);
