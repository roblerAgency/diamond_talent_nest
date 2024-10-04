import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Commons
import { USER_ROLES } from 'src/commons';

export class UserSelectionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(USER_ROLES)
  userRole: USER_ROLES;
}
