import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Services
import { UsersService } from './users.service';

// DTO'S
import { CreateUserDto, ResponseCreateUserDto } from './dto';

// Guards
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

// Decorators
import { IsPublic } from 'src/auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';

// Commons
import { ResponseInterceptor, ROLES } from '../../commons';

// Interceptors

// Entities
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create user.',
    description: 'this endpoint is for create a user.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'The fields to be created.',
  })
  @ApiResponse({
    status: 201,
    type: () => ResponseCreateUserDto,
    description: 'create user successfully.',
  })
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users.',
    description: 'this endpoint is get all users.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'The fields to be list users.',
  })
  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Get()
  getAllUsers(
    @Query() queries: { limit: number; page: number; search: any },
  ): Promise<{ users: User[]; count: number }> {
    return this.usersService.getAllUsers({ queries });
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Get(':id')
  getIdUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserId({ id });
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Patch(':id')
  editUser(@Param('id', ParseIntPipe) id: number, @Body() body): Promise<User> {
    return this.usersService.editUser({ id, body });
  }
}
