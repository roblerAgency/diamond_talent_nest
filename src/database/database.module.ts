// src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
  inject: [config.KEY],
  useFactory: (configService: ConfigType<typeof config>) => ({
    type: 'mysql',
    url: configService.database.url, // <— aquí
    autoLoadEntities: true,
    synchronize: false,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
