import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import config from '../../config/config';


@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        type: 'mysql',
        host: configService.database.host,
        port: configService.database.port,
        // --- CORRECCIÓN 1 ---
        username: configService.database.user, // Cambiado de 'username' a 'user'
        // --------------------
        password: configService.database.password,
        // --- CORRECCIÓN 2 ---
        database: configService.database.name, // Cambiado de 'database' a 'name'
        // --------------------
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
