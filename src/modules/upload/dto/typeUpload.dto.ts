import { IsEnum, IsNotEmpty } from 'class-validator';

// Commons
import { TYPE_PICTURE } from 'src/commons';

export class TypeUploadDto {
  @IsNotEmpty()
  @IsEnum(TYPE_PICTURE)
  typePicture: TYPE_PICTURE;
}
