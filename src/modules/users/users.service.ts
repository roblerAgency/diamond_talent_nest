import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

// DTO'S
import { CreateUserDto } from './dto';

// Entity
import { TypeOfEventCategoryItem } from '../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { TypeOfEventCategory } from '../typeOfEventCategory/entities/typeOfEventCategory.entities';
import { TypesOfModeling } from '../typesOfModeling/entities/typesOfModeling.entity';
import { UserLanguage } from 'src/modules/userLanguage/entities/userLanguage.entity';
import { User } from './entities/user.entity';

// Commons
import {
  ErrorManager,
  GENDER,
  ITEM_CATEGORIES,
  NATIONALITY,
  ROLES,
  USER_ROLES,
  calculateAge,
  errorManagerParamCharacter,
} from '../../../src/commons';
import { WorkingDaysWeek } from '../workingDaysWeek/entities/workingDaysWeek.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserLanguage)
    private userLanguageRepository: Repository<UserLanguage>,
    @InjectRepository(TypesOfModeling)
    private typeOfModelingRepository: Repository<TypesOfModeling>,
    @InjectRepository(WorkingDaysWeek)
    private workingDaysWeekRepository: Repository<WorkingDaysWeek>,
    @InjectRepository(TypeOfEventCategoryItem)
    private typeOfEventCategoryItemRepository: Repository<TypeOfEventCategoryItem>,
    @InjectRepository(TypeOfEventCategory)
    private typeOfEventCategoryRepository: Repository<TypeOfEventCategory>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const user = await this.findByEmail({ email: data.email });

      if (user) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'The email already exists',
        });
      }

      const age = calculateAge({ birthday: data.birthday });
      const newUser = this.usersRepository.create(data);

      newUser.age = age;

      return this.usersRepository.save(newUser);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getAllUsers({
    queries,
  }: {
    queries: { limit: number; page: number; search: any };
  }): Promise<{ users: User[]; count: number }> {
    try {
      const { search, page = 1, limit = 10 } = queries;

      let whereConditions = [];

      if (search) {
        // search for GENDER
        const matchingGenders = Object.values(GENDER).filter((gender) =>
          gender.toLowerCase().includes(search),
        );

        // search for NATIONALITY
        const matchingNationalities = Object.values(NATIONALITY).filter(
          (nationality) => nationality.toLowerCase().includes(search),
        );

        // search for ROLE
        const matchingRoles = Object.values(ROLES).filter((roles) =>
          roles.toLowerCase().includes(search),
        );

        // search for User role
        const matchingUserRoles = Object.values(USER_ROLES).filter((roles) =>
          roles.toLowerCase().includes(search),
        );

        whereConditions = [
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
          { location: ILike(`%${search}%`) },
          { address: ILike(`%${search}%`) },
          { gender: In(matchingGenders) },
          { nationality: In(matchingNationalities) },
          { role: In(matchingRoles) },
          { userRole: In(matchingUserRoles) },
        ];
      }

      const [users, count] = whereConditions.length
        ? await this.usersRepository.findAndCount({
            where: whereConditions,
            skip: (page - 1) * limit,
            take: limit,
          })
        : await this.usersRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
          });

      return { users, count };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getUserId({ id }: { id: number }): Promise<User> {
    try {
      errorManagerParamCharacter({ id });
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `User with id ${id} was not found`,
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async editUser({ id, body }): Promise<User> {
    try {
      if (!Object.values(body).length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'To edit a user you need to send a body',
        });
      }

      const user = await this.getUserId({ id });

      if (body?.userLanguage) {
        const languagesItemsArray = await Promise.all(
          body.userLanguage.map((item) =>
            this.userLanguageRepository.create({
              users: user,
              languages: item,
            }),
          ),
        );

        await this.userLanguageRepository.save(languagesItemsArray);
      }

      if (body?.typesOfModeling) {
        const typesOfModelingItemsArray = await Promise.all(
          body.typesOfModeling.map((item) =>
            this.typeOfModelingRepository.create({
              users: user,
              typesOfModeling: item,
            }),
          ),
        );

        await this.typeOfModelingRepository.save(typesOfModelingItemsArray);
      }

      if (body?.workingDaysWeek) {
        const workingDaysWeekArray = await Promise.all(
          body.workingDaysWeek.map((item) =>
            this.workingDaysWeekRepository.create({
              users: user,
              workingDaysWeek: item,
            }),
          ),
        );

        await this.typeOfModelingRepository.save(workingDaysWeekArray);
      }

      if (body?.typesOfEvents) {
        await Promise.all(
          body?.typesOfEvents.map(async (item) => {
            const events = await this.typeOfEventCategoryRepository.findOneBy({
              category: item.type_of_event
            })
            
            const eventsItems = this.typeOfEventCategoryItemRepository.create({
              item: item.event_item,
              typeOfEventCategory: events,
              user: user
            })
            
            console.log({ eventsItems })
            await this.typeOfEventCategoryItemRepository.save(eventsItems)
          })
        );

      }

      delete body.typesOfEvents;
      delete body.workingDaysWeek;
      delete body.userLanguage;
      delete body.typesOfModeling;

      const updateUser = Object.assign(user, body);
      await this.usersRepository.update(id, updateUser);

      return updateUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findByEmail({ email }: { email: string }): Promise<User> {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}

// this.typeOfModelingRepository.create({
//   users: user,
//   typesOfModeling: item,
// }),