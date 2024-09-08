import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Commons
import { GENDER, ROLES } from 'src/commons/models';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  readonly role: ROLES;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly birthday: Date

  @IsNotEmpty()
  @IsEnum(GENDER)
  readonly gender: GENDER

  @IsNotEmpty()
  @IsNumber()
  readonly phone_number: number
}

export class ResponseCreateUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthday: Date
  gender: GENDER
  phone_number: number;
  deleteAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
