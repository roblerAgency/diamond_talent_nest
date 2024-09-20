import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Commons
import { BaseEntity, TYPE_OF_EVENT_CATEGORY, ITypeOfEventCategory } from '../../../commons/';

// Entities
import { TypeOfEventCategoryItem } from '../../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
@Entity({ name: 'event_category' })
export class TypeOfEventCategory extends BaseEntity implements ITypeOfEventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TYPE_OF_EVENT_CATEGORY,
    default: null
  })
  category: TYPE_OF_EVENT_CATEGORY;

  @OneToMany(
    () => TypeOfEventCategoryItem,
    (typeOfEventCategoryItem) =>
      typeOfEventCategoryItem.item,
  )
  typeOfEventCategoryItem: TypeOfEventCategoryItem;
}
