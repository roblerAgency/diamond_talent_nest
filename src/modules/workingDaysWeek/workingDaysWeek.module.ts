import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { WorkingDaysWeek } from './entities/workingDaysWeek.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WorkingDaysWeek])]
})
export class WorkingDaysWeekModule {}
