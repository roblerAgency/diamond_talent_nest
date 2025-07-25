// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from '../config/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const dbConfig = configService.database;
        return {
          type: dbConfig.type as 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: true, // desactiva en producción
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
