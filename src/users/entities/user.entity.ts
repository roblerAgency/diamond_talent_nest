import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

// Commons
import { ROLES, GENDER, USER_ROLES, EYES, NATIONALITY, BaseEntity, IUser } from '../../commons/';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { default: null })
  age: number;

  @Column('decimal', { precision: 5, scale: 2, default: null })
  bust: number;

  @Column('decimal', { precision: 5, scale: 2, default: null })
  waist: number;

  @Column('decimal', { precision: 5, scale: 2, default: null })
  hips: number;

  @Column('decimal', { precision: 5, scale: 2, default: null })
  height: number;

  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 150, default: null, name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 150, default: null, name: 'alternate_phone_number' })
  alternatePhoneNumber: string;

  @Column({ type: 'varchar', length: 100, default: null })
  etnia: string;

  @Column({ type: 'varchar', length: 100, default: null })
  hair: string;

  @Column({ type: 'varchar', length: 100, default: null })
  shoes: string;

  @Column({ type: 'varchar', length: 255, default: null })
  dress: string;

  @Column({ type: 'varchar', length: 255, default: null })
  location: string;

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

  @Column({ type: 'boolean', default: false, name: 'registered_self_employed' })
  registeredSelfEmployed: boolean;

  @Column({ type: 'boolean', default: false, name: 'complete_register' })
  completeRegister: boolean;

  @Column({ type: 'date', default: null, name: 'time_zone' })
  timeZone: Date;

  @Column({ type: 'date', default: null })
  birthday: Date;

  @Column({ type: 'enum', enum: USER_ROLES })
  userRole: USER_ROLES;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @Column({ type: 'enum', enum: GENDER, default: GENDER.NOT_SPECIFIC })
  gender: GENDER;

  @Column({ type: 'enum', enum: EYES, default: null })
  eye: EYES;

  @Column({ type: 'enum', enum: NATIONALITY, default: null })
  nationality: NATIONALITY;
  
  // pictures: manyToOne

  // videos: manyToOne

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, 10);
  }
}
