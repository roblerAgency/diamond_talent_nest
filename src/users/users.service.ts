import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO'S
import { CreateUserDto, UpdateUserDto } from './dto';

// Entity
import { User } from './entities/user.entity';

// Commons
import {
  ErrorManager,
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

  async getAllUsers(): Promise<User[]> {
    try {
      return this.usersRepository.find();
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

  async editUser({ id, body }: { id: number; body: UpdateUserDto }): Promise<User> {
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
