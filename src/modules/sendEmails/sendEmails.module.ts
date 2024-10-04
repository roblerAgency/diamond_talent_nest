import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

// Services
import { SendEmailsService } from './sendEmails.service';
import { UsersService } from '../users/users.service';

// Controllers
import { SendEmailsController } from './sendEmails.controller';

// Entity
import { TypeOfEventCategoryItem } from '../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { TypeOfEventCategory } from '../typeOfEventCategory/entities/typeOfEventCategory.entities';
import { TypesOfModeling } from '../typesOfModeling/entities/typesOfModeling.entity';
import { WorkingDaysWeek } from '../workingDaysWeek/entities/workingDaysWeek.entity';
import { UserLanguage } from '../userLanguage/entities/userLanguage.entity';
import { Upload } from '../upload/entities/upload.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOfEventCategoryItem,
      TypeOfEventCategory,
      TypesOfModeling,
      WorkingDaysWeek,
      UserLanguage,
      Upload,
      User,
    ]),
  ],
  providers: [SendEmailsService, UsersService, JwtService],
  controllers: [SendEmailsController],
})
export class SendEmailsModule {}
