import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Commons
import { GENDER, ROLES, USER_ROLES } from 'src/commons';

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
  @IsEnum(USER_ROLES)
  readonly userRole: USER_ROLES

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string
}

export class ResponseCreateUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthday: Date
  gender: GENDER
  userRole: USER_ROLES
  phoneNumber: string;
  deleteAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
