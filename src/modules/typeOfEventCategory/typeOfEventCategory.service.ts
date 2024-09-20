import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// Commons
import {
  capitalizeWords,
  ErrorManager,
  TYPE_OF_EVENT_CATEGORY,
} from 'src/commons';

// Entities
import { TypeOfEventCategory } from './entities/typeOfEventCategory.entities';

// Dtos
import { CreateTypeOfEventCategory } from './dto';

@Injectable()
export class TypeOfEventCategoryService {
  constructor(
    @InjectRepository(TypeOfEventCategory)
    private eventCategoryRepository: Repository<TypeOfEventCategory>,
  ) {}

  async createEventCategory({
    body,
  }: {
    body: CreateTypeOfEventCategory;
  }): Promise<TypeOfEventCategory> {
    try {
      const categoryFound: TypeOfEventCategory =
        await this.getEventCategoryByName({
          category: body?.category,
        });

      if (categoryFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Event with ${body?.category} exist`,
        });
      }

      const category = capitalizeWords({ words: body?.category });
      const updateCategory = Object.assign(category, body);

      const event = await this.eventCategoryRepository.save(updateCategory);
      return event;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getEventCategoryById({
    id,
  }: {
    id: number;
  }): Promise<TypeOfEventCategory> {
    try {
      const eventCategory: TypeOfEventCategory =
        await this.eventCategoryRepository.findOneBy({
          id,
        });
      if (!eventCategory) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Event with ${id} not exist`,
        });
      }
      return eventCategory;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getEventCategoryByName({
    category,
  }: {
    category: TYPE_OF_EVENT_CATEGORY;
  }): Promise<TypeOfEventCategory> {
    try {
      return this.eventCategoryRepository.findOneBy({ category });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
