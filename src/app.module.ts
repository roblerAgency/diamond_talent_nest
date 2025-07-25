import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Servicios
import { AuthService } from './auth/services/auth/auth.service';

// Módulos internos
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './modules/upload/upload.module';
import { SendEmailsModule } from './modules/sendEmails/sendEmails.module';
import { UserLanguageModule } from './modules/userLanguage/userLanguage.module';
import { TypesOfModelingModule } from './modules/typesOfModeling/typesOfModeling.module';
import { WorkingDaysWeekModule } from './modules/workingDaysWeek/workingDaysWeek.module';
import { TypeOfEventCategoryModule } from './modules/typeOfEventCategory/typeOfEventCategory.module';
import { TypeOfEventCategoryItemModule } from './modules/typeOfEventCategoryItem/typeOfEventCategoryItem.module';

// Configs
import { configSchema } from '../config/validationSchema';
import { enviroments } from '../enviroments';
import config from '../config/config';

@Module({
  imports: [
    // Configuración global del entorno
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),

    // Servir archivos estáticos (imágenes u otros)
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'upload'), // o 'public_html/api_images' si migraste
      serveRoot: '/api/v1/',
    }),

    // Módulos funcionales
    DatabaseModule,
    AuthModule,
    UsersModule,
    JwtModule, // <- solo necesario aquí si no lo importas dentro de AuthModule
    UploadModule,
    SendEmailsModule,
    UserLanguageModule,
    TypesOfModelingModule,
    WorkingDaysWeekModule,
    TypeOfEventCategoryModule,
    TypeOfEventCategoryItemModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
