// src/database/data-source.ts
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// Construimos la URL base
const dbUrl = `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

// EL CAMBIO CLAVE: Usamos el mismo parámetro SSL codificado
const urlWithEncodedSsl = `${dbUrl}?ssl=%7B%22rejectUnauthorized%22%3Afalse%7D`;

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: urlWithEncodedSsl, // Usamos la nueva URL codificada
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/database/migrations/*{.js,.ts}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
