// Models
import { TYPE_OF_EVENT_CATEGORY } from '../models';

// Entities
import { TypeOfEventCategoryItem } from 'src/modules/typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';

export class ITypeOfEventCategory {
  category: TYPE_OF_EVENT_CATEGORY;
  typeOfEventCategoryItem: TypeOfEventCategoryItem;
}
