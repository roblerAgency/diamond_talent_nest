import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import { TypeOfEventCategoryService } from './typeOfEventCategory.service';

// Auth
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Commons
import { ResponseInterceptor, ROLES } from 'src/commons';

@ApiTags('Event Category')
@Controller('eventCategory')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class TypeOfEventCategoryController {
  constructor(
    private readonly eventCategoryServices: TypeOfEventCategoryService,
  ) {}

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Post()
  createEventCategory(@Body() body) {
    return this.eventCategoryServices.createEventCategory({ body });
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Get(':id')
  getEventCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.eventCategoryServices.getEventCategoryById({ id })
  }
}
