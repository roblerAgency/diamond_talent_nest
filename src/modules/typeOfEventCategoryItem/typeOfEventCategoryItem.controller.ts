import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Auth
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Commons
import { reqUser, ResponseInterceptor, ROLES } from 'src/commons';

// Services
import { TypeOfEventCategoryItemService } from './typeOfEventCategoryItem.service';

// Entities
import { TypeOfEventCategoryItem } from './entities/typeOfEventCategoryItem.entity';

@ApiTags('Event category item')
@Controller('eventCategoryItem')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class TypeOfEventCategoryItemController {
  constructor(private readonly categoryItems: TypeOfEventCategoryItemService) {}

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER)
  @Get()
  async getAllItemsEvent() {
    return this.categoryItems.getAllItemsEvent();
  }

  @Roles(ROLES.SUPERADMIN, ROLES.ADMIN)
  @Post()
  async createItemEvent(@Body() body, @Req() requestUser): Promise<TypeOfEventCategoryItem> {
    const user: reqUser = requestUser;
    return this.categoryItems.createItemEvent({ body, user });
  }
}
