import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

// DTO'S
import { CreateUserDto } from './dto';

// Entity
import { TypeOfEventCategoryItem } from '../typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { TypeOfEventCategory } from '../typeOfEventCategory/entities/typeOfEventCategory.entities';
import { TypesOfModeling } from '../typesOfModeling/entities/typesOfModeling.entity';
import { WorkingDaysWeek } from '../workingDaysWeek/entities/workingDaysWeek.entity';
import { UserLanguage } from 'src/modules/userLanguage/entities/userLanguage.entity';
import { User } from './entities/user.entity';

// Commons
import {
  ErrorManager,
  IUserReq,
  calculateAge,
  errorManagerParamCharacter,
  COUNTRY,
  CITIES,
  GENDER,
  ROLES,
  USER_ROLES,
} from '../../../src/commons';

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
    country,
    city,
    user,
  }: {
    queries: { limit: number; page: number; search: any };
    country: { country: COUNTRY[] };
    city: { city: CITIES[] };
    user: IUserReq;
  }): Promise<{ users: User[]; count: number }> {
    try {
      const { sub } = user;
      const { search, page = 1, limit = 10 } = queries;

      let whereConditions: any = {
        id: Not(sub),
      };

      if (search) {
        const matchingGenders = Object.values(GENDER).filter((gender) =>
          gender.toLowerCase().includes(search),
        );

        const matchingRoles = Object.values(ROLES).filter((roles) =>
          roles.toLowerCase().includes(search),
        );

        const matchingUserRoles = Object.values(USER_ROLES).filter((roles) =>
          roles.toLowerCase().includes(search),
        );

        whereConditions = [
          { firstName: Like(`%${search}%`) },
          { lastName: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
          { country: Like(`%${search}%`) },
          { city: Like(`%${search}%`) },
          { userRole: In(matchingUserRoles) },
          { gender: In(matchingGenders) },
          { role: In(matchingRoles) },
        ];
      }

      if (country && country.country && country.country.length > 0) {
        if (Array.isArray(whereConditions)) {
          whereConditions.push({ country: In(country.country) });
        } else {
          whereConditions.country = In(country.country);
        }
      }

      if (city && city.city && city.city.length > 0) {
        if (Array.isArray(whereConditions)) {
          whereConditions.push({ city: In(city.city) });
        } else {
          whereConditions.city = In(city.city);
        }
      }

      const [users, count] = await this.usersRepository.findAndCount({
        where: whereConditions,
        skip: (page - 1) * limit,
        take: limit,
        relations: ['userLanguage'],
      });

      return { count, users };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getUserId({ id }: { id: number }): Promise<User> {
    try {
      errorManagerParamCharacter({ id });
      const user = await this.usersRepository.findOne({
        where: {
          id: id,
        },
        relations: ['userLanguage'],
      });

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

      // if (body?.userLanguage) {
      //   const userLanguages: UserLanguage[] = user?.userLanguage || [];

      //   const filteredLanguages = body?.userLanguage?.filter(newLang =>
      //     !userLanguages.some(existingLang => existingLang.languages === newLang)
      //   ) || [];

      //   const languagesItemsArray = await Promise.all(
      //     filteredLanguages.map((item) =>
      //       this.userLanguageRepository.create({
      //         users: user,
      //         languages: item,
      //       }),
      //     ),
      //   );

      //   await this.userLanguageRepository.save(languagesItemsArray);
      // }

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
              category: item.type_of_event,
            });

            const eventsItems =
              await this.typeOfEventCategoryItemRepository.findOneBy({
                item: item.event_item,
              });

            eventsItems.typeOfEventCategory = events;
            eventsItems.user = user;
          }),
        );
      }

      delete body.userLanguage;
      delete body.typesOfModeling;
      delete body.workingDaysWeek;
      delete body.typesOfEvents;

      const updateUser = Object.assign(user, body);
      await this.usersRepository.update(id, updateUser);

      return updateUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async softDeleteUser({ id }: { id: number }): Promise<User> {
    try {
      const user: User = await this.getUserId({ id });

      if (user?.archive) {
        await this.usersRepository.softDelete(id);
        return user;
      } else {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: `The user with the id ${id} is not archived, to be able to delete the user, the user must be archived `,
        });
      }
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
