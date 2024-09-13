import { OmitType, PartialType } from '@nestjs/swagger';

// DTO'S
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

const ExcludedUserFields = ['password', 'email'] as const;
export class UpdateUserDto extends OmitType(
  PartialType(CreateUserDto),
  ExcludedUserFields,
) {

  @IsString()
  etnia: string;

  @IsString()
  hair: string;

  @IsString()
  eye: string;

  @IsString()
  shoes: string;

  @IsString()
  bust: number;

  @IsString()
  waist: number;

  @IsString()
  hips: number;

  @IsString()
  dress: string;

  @IsString()
  location: string;

  @IsString()
  nacionality: string;

  @IsString()
  aboutMe: string;

  @IsString()
  pictureProfile: string;

  @IsString()
  socialMediaNetwork: string;

  @IsNumber()
  height: number;

  @IsBoolean()
  completeRegister: boolean
}
