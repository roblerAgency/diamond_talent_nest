import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Entity
import { UserLanguage } from './entities/userLanguage.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserLanguage])],
})
export class UserLanguageModule {}
