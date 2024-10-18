// Modules
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtService } from '@nestjs/jwt';

// Controllers
import { UploadController } from './upload.controller';

// Services
import { UsersService } from '../users/users.service';

// Services
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { TypeOfEventCategoryItem } from '../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { WorkingDaysWeek } from '../workingDaysWeek/entities/workingDaysWeek.entity';
import { TypesOfModeling } from '../typesOfModeling/entities/typesOfModeling.entity';
import { TypeOfEventCategory } from '../typeOfEventCategory/entities/typeOfEventCategory.entities';
import { UserLanguage } from '../userLanguage/entities/userLanguage.entity';
import { User } from '../users/entities/user.entity';
import { Upload } from './entities/upload.entity';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: '/upload',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),

    TypeOrmModule.forFeature([
      Upload,
      User,
      UserLanguage,
      TypesOfModeling,
      WorkingDaysWeek,
      TypeOfEventCategoryItem,
      TypeOfEventCategory,
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService, UsersService, JwtService],
})
export class UploadModule {}
