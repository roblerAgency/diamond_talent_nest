import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

// Entities
import { User } from 'src/modules/users/entities/user.entity';

// Commons
import { BaseEntity, TYPE_PICTURE } from 'src/commons';

@Entity({ name: 'upload' })
export class Upload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: null })
  filename: string; 

  @Column({ type: 'text', default: null })
  url: string; 

  @Column({ type: 'enum', enum: TYPE_PICTURE, default: TYPE_PICTURE.PHOTO_GALLERY, name: 'type_picture' })
  typePicture: TYPE_PICTURE;

  @ManyToOne(()=> User, (user)=> user.uploadImages)
  @JoinColumn({
    name: 'user_id',
  })
  users: User
}
