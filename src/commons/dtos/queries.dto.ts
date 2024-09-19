import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryOptionsDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
    description: 'List page',
  })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({
    type: Number,
    example: 10,
    required: false,
    description: 'Limit per page',
  })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  search?: any;
}
