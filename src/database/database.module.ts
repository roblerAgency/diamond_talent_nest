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
          keepConnectionAlive: true,
          extra: {
            connectionLimit: 10,      
            connectTimeout: 20000,  
            acquireTimeout: 20000,   
          },
          // -----------------------------
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
