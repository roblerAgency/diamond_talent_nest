import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

// Commons
import { ROLES, GENDER, USER_ROLES } from '../../commons/models';
import { BaseEntity } from '../../commons/baseEntity';

// Interfaces
import { IUser } from '../../commons/Interface/user.interface';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @Column({ type: 'enum', enum: USER_ROLES })
  userRole: USER_ROLES;

  @Column('int', { default: null })
  age: number;

  @Column({ type: 'date', default: null })
  birthday: Date;

  @Column({ type: 'enum', enum: GENDER, default: GENDER.NOT_SPECIFIC })
  gender: GENDER;

  @Column({ type: 'date', default: null, name: 'time_zone' })
  timeZone: Date;

  @Column({ type: 'varchar', length: 150, default: null, name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 150, default: null, name: 'alternate_phone_number' })
  alternatePhoneNumber: string;

  @Column({ type: 'boolean', default: false, name: 'registered_self_employed' })
  registeredSelfEmployed: boolean;

  @Column({ type: 'varchar', length: 100, default: null })
  etnia: string;

  @Column({ type: 'varchar', length: 100, default: null })
  hair: string;

  @Column({ type: 'varchar', length: 100, default: null })
  eye: string;

  @Column({ type: 'varchar', length: 100, default: null })
  shoes: string;

  @Column({ type: 'varchar', length: 100, default: null })
  bust: string;

  @Column({ type: 'varchar', length: 255, default: null })
  waist: string;

  @Column({ type: 'varchar', length: 255, default: null })
  hips: string;

  @Column({ type: 'varchar', length: 255, default: null })
  dress: string;

  @Column({ type: 'varchar', length: 255, default: null })
  location: string;

  @Column({ type: 'varchar', length: 255, default: null })
  nationality: string;

  @Column({ type: 'varchar', length: 255, default: null, name: 'about_me' })
  aboutMe: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
    name: 'picture_profile',
  })
  pictureProfile: string;

  @Column({ type: 'simple-array', default: null, name: 'social_media_network' })
  socialMediaNetwork: string[];

  @Column('decimal', { precision: 5, scale: 2, default: null })
  height: number;

  // disciplines: manyToOne

  // languages: manyToOne

  // pictures: manyToOne

  // videos: manyToOne

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, 10);
  }
}
