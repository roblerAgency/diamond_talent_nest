import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { TypeOfEventCategoryItem } from '../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { TypeOfEventCategory } from '../typeOfEventCategory/entities/typeOfEventCategory.entities';
import { TypesOfModeling } from '../typesOfModeling/entities/typesOfModeling.entity';
import { WorkingDaysWeek } from '../workingDaysWeek/entities/workingDaysWeek.entity';
import { UserLanguage } from '../userLanguage/entities/userLanguage.entity';
import { User } from '../users/entities/user.entity';

// Services
import { TypeOfEventCategoryService } from '../typeOfEventCategory/typeOfEventCategory.service';
import { TypeOfEventCategoryItemService } from './typeOfEventCategoryItem.service';
import { UsersService } from '../users/users.service';

// Controllers
import { TypeOfEventCategoryItemController } from './typeOfEventCategoryItem.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      TypeOfEventCategory,
      TypeOfEventCategoryItem,
      UserLanguage,
      TypesOfModeling,
      WorkingDaysWeek,
    ]),
  ],
  providers: [
    TypeOfEventCategoryItemService,
    UsersService,
    TypeOfEventCategoryService,
  ],
  controllers: [TypeOfEventCategoryItemController],
})
export class TypeOfEventCategoryItemModule {}
