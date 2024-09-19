import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Commons
import { BaseEntity, TYPE_MODELING } from '../../../commons/';

// Entities
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'types_of_modeling' })
export class TypesOfModeling extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TYPE_MODELING, default: null, name: "types_of_modeling" })
  typesOfModeling: TYPE_MODELING;

  @ManyToOne(() => User, (user) => user.typesOfModeling)
  @JoinColumn({
    name: 'user_id',
  })
  users: User;
}
