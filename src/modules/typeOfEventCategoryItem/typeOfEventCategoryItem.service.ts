import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// Commons
import { ErrorManager, reqUser } from 'src/commons';

// Entities
import { TypeOfEventCategoryItem } from './entities/typeOfEventCategoryItem.entity';

// Services
import { TypeOfEventCategoryService } from '../typeOfEventCategory/typeOfEventCategory.service';
import { UsersService } from '../users/users.service';

// Dtos
import { CreateItemEventDto } from './dto';

@Injectable()
export class TypeOfEventCategoryItemService {
  constructor(
    @InjectRepository(TypeOfEventCategoryItem)
    private eventCategoryItemsRepository: Repository<TypeOfEventCategoryItem>,
    private readonly typeOfEventCategoryService: TypeOfEventCategoryService,
    private readonly userService: UsersService,
  ) {}

  async getAllItemsEvent(): Promise<TypeOfEventCategoryItem[]> {
    try {
      return this.eventCategoryItemsRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async createItemEvent({
    body,
    user,
  }: {
    body: CreateItemEventDto;
    user: reqUser;
  }): Promise<TypeOfEventCategoryItem> {
    try {
      const item: TypeOfEventCategoryItem = await this.getCategoryItemByItem({
        item: body?.item,
      });

      if (item) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Item ${body.item} exist`,
        });
      }

      const typeOfEventCategoryFound =
        await this.typeOfEventCategoryService.getEventCategoryById({
          id: body.categoryId,
        });
      const userFound = await this.userService.getUserId({ id: user?.sub });

      const categoryItem = this.eventCategoryItemsRepository.create({
        user: userFound,
        item: body?.item,
        typeOfEventCategory: typeOfEventCategoryFound,
      });

      await this.eventCategoryItemsRepository.save(categoryItem);
      return body;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getCategoryItemByItem({ item }): Promise<TypeOfEventCategoryItem> {
    try {
      return await this.eventCategoryItemsRepository.findOneBy({ item });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
