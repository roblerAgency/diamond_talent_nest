import { IsEnum, IsNotEmpty } from "class-validator"

// Commons
import { ITEM_CATEGORIES } from "src/commons"

// Entities
import { TypeOfEventCategoryItem } from "../entities/typeOfEventCategoryItem.entity"
import { User } from "src/modules/users/entities/user.entity"

export class CreateItemEventDto extends TypeOfEventCategoryItem {
    @IsNotEmpty()
    @IsEnum(ITEM_CATEGORIES)
    item: ITEM_CATEGORIES

    @IsNotEmpty()    
    categoryId: number

    @IsNotEmpty()
    user: User
}