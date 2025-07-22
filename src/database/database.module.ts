// src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    url: process.env.DATABASE_URL, // ← usa solo esta línea
    autoLoadEntities: true,
    synchronize: false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
