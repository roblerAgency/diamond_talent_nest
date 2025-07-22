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
        // Obtenemos las partes de la URL desde tu configuración
        const { host, port, user, password, name } = configService.database;

        // 1. Construimos la URL base manualmente
        const dbUrl = `mysql://${user}:${password}@${host}:${port}/${name}`;

        // 2. Le añadimos el parámetro SSL de forma explícita. Esto es lo más importante.
        const urlWithSsl = `${dbUrl}?ssl={"rejectUnauthorized":false}`;

        return {
          type: 'mysql',
          // 3. Usamos la nueva URL que acabamos de construir
          url: urlWithSsl,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
