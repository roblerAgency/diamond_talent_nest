import { OmitType, PartialType } from '@nestjs/swagger';

// DTO'S
import { CreateUserDto } from './create-user.dto';

const ExcludedUserFields = ['password', 'email'] as const;
export class UpdateUserDto extends OmitType(
    PartialType(CreateUserDto),
    ExcludedUserFields,
  ) {
}
