import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Commons
import { BaseEntity, ITEM_CATEGORIES } from '../../../commons/';

// Entities
import { TypeOfEventCategory } from '../../typeOfEventCategory/entities/typeOfEventCategory.entities';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'event_category_item' })
export class TypeOfEventCategoryItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ITEM_CATEGORIES,
    default: null,
  })
  item: ITEM_CATEGORIES;

  @ManyToOne(
    () => TypeOfEventCategory,
    (typeOfEventCategory) => typeOfEventCategory.typeOfEventCategoryItem,
  )
  @JoinColumn({ name: 'category_id' })
  typeOfEventCategory: TypeOfEventCategory;

  @ManyToMany(() => User, (user) => user.typeOfEventCategoryItem)
  user: User;
}
