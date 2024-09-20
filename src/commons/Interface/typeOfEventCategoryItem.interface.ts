// Models
import { ITEM_CATEGORIES } from '../models';

// Entities
import { TypeOfEventCategory } from 'src/modules/typeOfEventCategory/entities/typeOfEventCategory.entities';
import { User } from 'src/modules/users/entities/user.entity';

export class ITypeOfEventCategoryItem {
    item: ITEM_CATEGORIES
    typeOfEventCategory: TypeOfEventCategory
    user: User
}
