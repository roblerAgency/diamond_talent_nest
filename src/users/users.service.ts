import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

// DTO'S
import { CreateUserDto, UpdateUserDto } from './dto';

// Entity
import { User } from './entities/user.entity';

// Commons
import {
  ErrorManager,
  GENDER,
  NATIONALITY,
  ROLES,
  USER_ROLES,
  calculateAge,
  errorManagerParamCharacter,
} from '../../src/commons';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<CreateUserDto> {
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
  }) {
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
          { dress: ILike(`%${search}%`) },
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

  async getUserId({ id }): Promise<User> {
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

  async editUser({
    id,
    body,
  }: {
    id: number;
    body: UpdateUserDto;
  }): Promise<User> {
    try {
      if (!Object.values(body).length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'To edit a user you need to send a body',
        });
      }

      const user = await this.getUserId({ id });

      const updateUser = Object.assign(user, body);
      await this.usersRepository.update(id, updateUser);

      return updateUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  findByEmail({ email }: { email: string }): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
