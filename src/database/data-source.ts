// src/database/data-source.ts
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

// 1. Leemos las variables de entorno individuales
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// 2. Construimos la URL base manualmente
const dbUrl = `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

// 3. Le añadimos el parámetro SSL
const urlWithSsl = `${dbUrl}?ssl={"rejectUnauthorized":false}`;

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  // 4. Usamos la URL completa
  url: urlWithSsl,
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/database/migrations/*{.js,.ts}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
