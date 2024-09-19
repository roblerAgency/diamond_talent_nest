import { OmitType, PartialType } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsString, IsEnum } from 'class-validator';
// DTO'S
import { CreateUserDto } from './create-user.dto';

// Commons
import { EYES, NATIONALITY } from 'src/commons';

const ExcludedUserFields = ['password', 'email'] as const;
export class UpdateUserDto extends OmitType(
  PartialType(CreateUserDto),
  ExcludedUserFields,
) {

  @IsString()
  etnia: string;

  @IsString()
  hair: string;

  @IsEnum(EYES)
  eye: EYES;

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

  @IsEnum(NATIONALITY)
  nacionality: NATIONALITY;

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
