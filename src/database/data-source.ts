// src/database/data-source.ts
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

// Usamos 'DataSourceOptions' para tener un tipado correcto
export const dataSourceOptions: DataSourceOptions = {
  // 1. Forzar el uso del driver 'mysql2'
  type: 'mysql2',

  // 2. Pasar los parámetros directamente desde las variables de entorno
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // Convertir el puerto a número
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  // 3. Añadir la configuración SSL para Railway
  ssl: {
    rejectUnauthorized: false,
  },

  logging: false,
  synchronize: false,
  entities: ['dist/**/*.entity{.js,.ts}'], // Usar 'dist' para producción
  migrations: ['dist/database/migrations/*{.js,.ts}'], // Usar 'dist' para producción
  migrationsTableName: 'migrations',
};

// Exportar la instancia para que los comandos de TypeORM la puedan usar
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
