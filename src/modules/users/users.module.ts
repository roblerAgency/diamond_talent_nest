import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Contollers
import { UsersController } from './users.controller';

// Entity
import { UserLanguage } from 'src/modules/userLanguage/entities/userLanguage.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserLanguage])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
