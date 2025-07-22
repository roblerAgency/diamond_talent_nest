// src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config/config'; // Asegúrate de que la ruta sea correcta

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        // 1. Forzar el uso del driver 'mysql2'
        type: 'mysql2',

        // 2. Usar los nombres de propiedad correctos ('user' y 'name')
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.user,
        password: configService.database.password,
        database: configService.database.name,

        // 3. Añadir la configuración SSL
        ssl: {
          rejectUnauthorized: false,
        },

        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
