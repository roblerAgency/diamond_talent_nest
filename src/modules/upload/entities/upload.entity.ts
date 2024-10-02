import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

// Entities
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'upload' })
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: null })
  filename: string; 

  @Column({ type: 'text', default: null })
  url: string; 

  @ManyToOne(()=> User, (user)=> user.uploadImages)
  @JoinColumn({
    name: 'user_id',
  })
  users: User
}
