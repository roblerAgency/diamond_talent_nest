import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

// Commons
import { TYPE_OF_EVENT_CATEGORY } from "src/commons";

// Entities
import { TypeOfEventCategoryItem } from "src/modules/typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity";
import { TypeOfEventCategory } from "../entities/typeOfEventCategory.entities";

export class CreateTypeOfEventCategory extends TypeOfEventCategory {

    @IsNotEmpty()
    @IsEnum(TYPE_OF_EVENT_CATEGORY)
    category: TYPE_OF_EVENT_CATEGORY;

    @IsNotEmpty()
    @IsNumber()
    typeOfEventCategoryItem: TypeOfEventCategoryItem;
}
