import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// Commons
import { ErrorManager } from 'src/commons';

// Entities
import { TypeOfEventCategoryItem } from './entities/typeOfEventCategoryItem.entity';

// Services
import { TypeOfEventCategoryService } from '../typeOfEventCategory/typeOfEventCategory.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TypeOfEventCategoryItemService {
  constructor(
    @InjectRepository(TypeOfEventCategoryItem)
    private eventCategoryItemsRepository: Repository<TypeOfEventCategoryItem>,
    private readonly typeOfEventCategoryService: TypeOfEventCategoryService,
    private readonly userService: UsersService,
  ) {}

  async getAll() {
    try {
      return this.eventCategoryItemsRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async create({ body, user }) {
    try {
      const item = await this.getCategoryItemByItem({ item: body?.item });

      if (item) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Item ${body.item} exist`,
        });
      }

      const typeOfEventCategoryFound =
        await this.typeOfEventCategoryService.getEventCategoryById({
          id: user?.sub,
        });
      const userFound = await this.userService.getUserId({ id: user?.sub });

      this.eventCategoryItemsRepository.create({
        user: userFound,
        item: body?.item,
        typeOfEventCategory: typeOfEventCategoryFound,
      });

      return body;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getCategoryItemByItem({ item }) {
    try {
      return await this.eventCategoryItemsRepository.findOneBy({ item });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
