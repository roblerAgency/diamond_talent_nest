// robleragency/diamond_talent_nest/diamond_talent_nest-77af46dc787f9e21f2b91b8de8a192492e3fc974/src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from 'config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.database;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: name,
          autoLoadEntities: true,
          synchronize: false,
          // --- AÑADE ESTAS LÍNEAS ---
          keepConnectionAlive: true, // <-- Mantiene la conexión viva
          extra: {
            connectionLimit: 10, // <-- Usa un pool de conexiones
            idleTimeoutMillis: 60000, // <-- Cierra conexiones inactivas después de 60s
            connectTimeout: 10000 // <-- Tiempo de espera para la conexión inicial
          },
          // --------------------------
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
