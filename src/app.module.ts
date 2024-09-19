import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Services
import { AuthService } from './auth/services/auth/auth.service';

// Module
import { WorkingDaysWeekModule } from './modules/workingDaysWeek/workingDaysWeek.module';
import { TypesOfModelingModule } from './modules/typesOfModeling/typesOfModeling.module';
import { UserLanguageModule } from './modules/userLanguage/userLanguage.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';

// Configs
import { configSchema } from '../config/validationSchema';
import { enviroments } from '../enviroments';
import config from '../config/config';

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
    TypesOfModelingModule,
    WorkingDaysWeekModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
