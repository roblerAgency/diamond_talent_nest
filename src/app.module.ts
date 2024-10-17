import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';

// Services
import { AuthService } from './auth/services/auth/auth.service';

// Module
import { TypeOfEventCategoryItemModule } from './modules/typeOfEventCategoryItem/typeOfEventCategoryItem.module';
import { TypeOfEventCategoryModule } from './modules/typeOfEventCategory/typeOfEventCategory.module';
import { WorkingDaysWeekModule } from './modules/workingDaysWeek/workingDaysWeek.module';
import { TypesOfModelingModule } from './modules/typesOfModeling/typesOfModeling.module';
import { UserLanguageModule } from './modules/userLanguage/userLanguage.module';
import { SendEmailsModule } from './modules/sendEmails/sendEmails.module';
import { UploadModule } from './modules/upload/upload.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';

// Configs
import { configSchema } from '../config/validationSchema';
import { enviroments } from '../enviroments';
import config from '../config/config';
import { join } from 'path';

// TODO: Desplegar las imagenes en Hostinger

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'upload'),
      serveRoot: '/api/v1/',
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    JwtModule,
    UserLanguageModule,
    TypesOfModelingModule,
    WorkingDaysWeekModule,
    TypeOfEventCategoryModule,
    TypeOfEventCategoryItemModule,
    UploadModule,
    SendEmailsModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
