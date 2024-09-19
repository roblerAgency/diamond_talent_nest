import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UsersService } from './users.service';

// Contollers
import { UsersController } from './users.controller';

// Entity
import { User } from './entities/user.entity';
import { UserLanguage } from 'src/userLanguage/entities/userLanguage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserLanguage])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
