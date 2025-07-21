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
          synchronize: false, // <-- Asegúrate de que esté en 'false' para producción.
          
          // --- CONFIGURACIÓN PARA MANTENER LA CONEXIÓN ---
          keepConnectionAlive: true,
          extra: {
            connectionLimit: 10, // Límite de conexiones en el pool
          },
          // ---------------------------------------------
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
