import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Contollers
import { UsersController } from './users.controller';

// Entity
import { TypeOfEventCategoryItem } from '../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { TypeOfEventCategory } from '../typeOfEventCategory/entities/typeOfEventCategory.entities';
import { TypesOfModeling } from '../typesOfModeling/entities/typesOfModeling.entity';
import { UserLanguage } from 'src/modules/userLanguage/entities/userLanguage.entity';
import { WorkingDaysWeek } from '../workingDaysWeek/entities/workingDaysWeek.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOfEventCategoryItem,
      TypeOfEventCategory,
      TypesOfModeling,
      WorkingDaysWeek,
      UserLanguage,
      User,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
