// src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, port, user, password, name } = configService.database;

        // Construimos la URL base
        const dbUrl = `mysql://${user}:${password}@${host}:${port}/${name}`;

        // 1. EL CAMBIO CLAVE: El parámetro SSL ahora está codificado para URL.
        // `{"rejectUnauthorized":false}` se convierte en `%7B%22rejectUnauthorized%22%3Afalse%7D`
        const urlWithEncodedSsl = `${dbUrl}?ssl=%7B%22rejectUnauthorized%22%3Afalse%7D`;

        // 2. (OPCIONAL PERO RECOMENDADO) Añade este log para verificar en Railway
        console.log('Connecting with URL:', urlWithEncodedSsl);

        return {
          type: 'mysql',
          url: process.env.DATABASE_URL, 
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
