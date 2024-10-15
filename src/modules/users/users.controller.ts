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
  Delete,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import { UsersService } from './users.service';

// DTO'S
import { CreateUserDto } from './dto';

// Guards
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

// Decorators
import { IsPublic } from 'src/auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';

// Commons
import { ResponseInterceptor, ROLES } from '../../commons';

// Entities
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req): Promise<User> {
    const authorizationHeader = req.headers.authorization;

    return this.usersService.create({
      data: createUserDto,
      userReq: authorizationHeader,
    });
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Get()
  getAllUsers(
    @Query() queries: { limit: number; page: number; search: any },
    @Query('filterUser') filterUser: string,
    @Query('completeRegister') completeRegister: string,
    @Query('isArchive') isArchive: string,
    @Query('country') country: string,
    @Query('city') city: string,
    @Req() req,
  ): Promise<{ users: User[]; count: number }> {
    let parsedFilterUser;
    if (filterUser) {
      try {
        parsedFilterUser = JSON.parse(filterUser);
      } catch (error) {
        throw new Error('Invalid filterUser format');
      }
    }

    return this.usersService.getAllUsers({
      queries,
      filterUser: parsedFilterUser,
      country,
      city,
      user: req.user,
      isArchive,
      completeRegister,
    });
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER)
  @Get(':id')
  getIdUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserId({ id });
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER)
  @Patch(':id')
  editUser(@Param('id', ParseIntPipe) id: number, @Body() body): Promise<User> {
    return this.usersService.editUser({ id, body });
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Delete(':id')
  softDeleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.softDeleteUser({ id });
  }
}
