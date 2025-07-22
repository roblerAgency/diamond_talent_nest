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
      useFactory: (configService: ConfigType<typeof config>) => ({
        // 1. Volver al tipo correcto
        type: 'mysql',

        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.user,
        password: configService.database.password,
        database: configService.database.name,

        // 2. Mover la configuración SSL dentro de 'extra'
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
