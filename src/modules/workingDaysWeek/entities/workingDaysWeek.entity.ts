import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Commons
import { BaseEntity, WORKING_DAYS_WEEK } from '../../../commons/';

// Entities
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'working_days_week' })
export class WorkingDaysWeek extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: WORKING_DAYS_WEEK, default: null })
  workingDaysWeek: WORKING_DAYS_WEEK;

  @ManyToOne(() => User, (user) => user.workingDaysWeek)
  @JoinColumn({
    name: 'user_id',
  })
  users: User;
}
