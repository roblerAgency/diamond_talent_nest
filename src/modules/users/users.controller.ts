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
import { CITIES, COUNTRY, ResponseInterceptor, ROLES } from '../../commons';

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
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Get()
  getAllUsers(
    @Query() queries: { limit: number; page: number; search: any },
    @Query('country') country: COUNTRY[],
    @Query('city') city: CITIES[],
    @Query('isActive') isActive: string,
    @Req() req,
  ): Promise<{ users: User[]; count: number }> {
    return this.usersService.getAllUsers({
      queries,
      country: { country },
      city: { city },
      user: req.user,
      isActive
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
