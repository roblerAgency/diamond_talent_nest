import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Auth
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Commons
import { ResponseInterceptor } from 'src/commons';

// Services
import { TypeOfEventCategoryItemService } from './typeOfEventCategoryItem.service';

@ApiTags('Event category item')
@Controller('eventCategoryItem')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class TypeOfEventCategoryItemController {
    constructor(private readonly categoryItems: TypeOfEventCategoryItemService) {}

    @Get()
    async getAll() {
        return this.categoryItems.getAll()
    }

    @Post()
    async create(@Body() body, @Req() req) {
        console.log({ req: req.user })
        return this.categoryItems.create({ body, user: req.user })
    }
}

