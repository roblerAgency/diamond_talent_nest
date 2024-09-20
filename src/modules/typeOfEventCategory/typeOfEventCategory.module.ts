import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { TypeOfEventCategoryItem } from '../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { TypeOfEventCategory } from './entities/typeOfEventCategory.entities';
import { User } from '../users/entities/user.entity';

// Controllers
import { TypeOfEventCategoryController } from './typeOfEventCategory.controller';

//Services
import { TypeOfEventCategoryService } from './typeOfEventCategory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      TypeOfEventCategory,
      TypeOfEventCategoryItem,
    ]),
  ],
  controllers: [TypeOfEventCategoryController],
  providers: [TypeOfEventCategoryService],
})
export class TypeOfEventCategoryModule {}
