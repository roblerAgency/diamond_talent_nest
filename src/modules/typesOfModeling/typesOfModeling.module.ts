import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Entity
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])]
})
export class TypesOfModelingModule {}
