// src/database/database.module.ts

// ... (otros imports)
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config/config';
import { ConfigType } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        type: 'mysql',
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.username,
        password: configService.database.password,
        database: configService.database.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        // --- LÍNEA A AÑADIR ---
        ssl: {
          rejectUnauthorized: false,
        },
        // --------------------
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
