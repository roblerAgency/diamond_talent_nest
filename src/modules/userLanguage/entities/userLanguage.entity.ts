import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Commons
import { BaseEntity, LANGUAGES } from '../../../commons/';

// Entities
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'language_users' })
export class UserLanguage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: LANGUAGES, default: null })
  languages: LANGUAGES;

  @ManyToOne(()=> User, (user)=> user.userLanguage)
  @JoinColumn({
    name: 'user_id',
  })
  users: User;
}
