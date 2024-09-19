import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Services
import { AuthService } from './auth/services/auth/auth.service';

// Module
import { UserLanguageModule } from './userLanguage/userLanguage.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// Const
import { enviroments } from '../enviroments';
import config from '../config/config';
import { configSchema } from '../config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    JwtModule,
    UserLanguageModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
