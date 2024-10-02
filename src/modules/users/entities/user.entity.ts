import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

// Commons
import {
  ROLES,
  GENDER,
  USER_ROLES,
  EYES,
  NATIONALITY,
  BaseEntity,
  IUser,
  CITIES,
  WEEKLY_HOURS,
  COUNTRY,
  STATUS_ACCOUNT
} from '../../../commons/';

// Entities
import { TypesOfModeling } from 'src/modules/typesOfModeling/entities/typesOfModeling.entity';
import { WorkingDaysWeek } from 'src/modules/workingDaysWeek/entities/workingDaysWeek.entity';
import { UserLanguage } from 'src/modules/userLanguage/entities/userLanguage.entity';
import { TypeOfEventCategoryItem } from 'src/modules/typeOfEventCategoryItem/entities/typeOfEventCategoryItem.entity';
import { Upload } from 'src/modules/upload/entities/upload.entity';

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

  @Column('decimal', { precision: 5, scale: 2, default: null })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2, default: null })
  extent: number

  @Column('decimal', { precision: 5, scale: 2, default: null, name: 'clothing_size' })
  clothingSize: number;

  @Column({ type: 'bigint', default: null })
  contact: number;

  @Column({ type: 'bigint', default: null, name: 'alternate_phone_number' })
  alternatePhoneNumber: number

  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100, default: null })
  etnia: string;

  @Column({ type: 'varchar', length: 100, default: null })
  hair: string;

  @Column({ type: 'varchar', length: 100, default: null })
  shoes: string;

  @Column({ type: 'varchar', length: 255, default: null })
  address: string;

  @Column({ type: 'varchar', length: 255, default: null })
  location: string;

  @Column({ type: 'text', default: null, name: 'about_me' })
  aboutMe: string;

  @Column({ type: 'varchar', length: 255, default: null })
  footwear: string;

  @Column({
    type: 'text',
    default: null,
    name: 'experience_modeling',
  })
  experienceModeling: string;

  @Column({
    type: 'text',
    default: null,
    name: 'previous_clients',
  })
  previousClients: string;

  @Column({
    type: 'text',
    default: null,
    name: 'previous_agencies',
  })
  previousAgencies: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
    name: 'picture_profile',
  })
  pictureProfile: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
    name: 'social_media_network',
  })
  socialMediaNetwork: string;

  @Column({
    type: 'text',
    default: null,
    name: 'customer_services_skills',
  })
  customerServiceSkills: string

  @Column({
    type: 'text',
    default: null,
    name: 'knowledge_of_protocols_and_procedures',
  })
  knowledgeOfProtocolsAndProcedures: string

  @Column({
    type: 'text',
    default: null,
    name: 'customer_testimonials_or_recommendations',
  })
  customerTestimonialsOrRecommendations: string

  @Column({
    type: 'text',
    default: null,
    name: 'reference_contacts_in_the_industry',
  })
  referenceContactsInTheIndustry: string

  @Column({
    type: 'varchar',
    length: '255',
    default: null,
    name: 'photographs_of_previous_works',
  })
  photographsOfPreviousWorks: string

  @Column({ type: 'boolean', default: false, name: 'registered_self_employed' })
  registeredSelfEmployed: boolean;

  @Column({ type: 'boolean', default: false, name: 'complete_register' })
  completeRegister: boolean;

  @Column({ type: 'boolean', default: false, name: 'availability_to_travel' })
  availabilityToTravel: boolean;

  @Column({ type: 'boolean', default: false })
  archive: boolean;

  @Column({ type: 'timestamp', default: null })
  birthdate: Date;

  @Column({ type: 'enum', enum: CITIES, default: null })
  city: CITIES;

  @Column({ type: 'enum', enum: USER_ROLES, default: null, name: 'user_role' })
  userRole: USER_ROLES;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @Column({ type: 'enum', enum: GENDER, default: GENDER.NOT_SPECIFIC })
  gender: GENDER;

  @Column({ type: 'enum', enum: EYES, default: null })
  eye: EYES;

  @Column({ type: 'enum', enum: NATIONALITY, default: null })
  nationality: NATIONALITY;

  @Column({ type: 'enum', enum: COUNTRY, default: null })
  country: COUNTRY;

  @Column({ type: 'enum', enum: STATUS_ACCOUNT, default: STATUS_ACCOUNT.PENDING })
  verify: STATUS_ACCOUNT;

  @Column({
    type: 'enum',
    enum: WEEKLY_HOURS,
    default: null,
    name: 'weekly_hours',
  })
  weeklyHours: WEEKLY_HOURS;

  @OneToMany(() => WorkingDaysWeek, (workingDaysWeek) => workingDaysWeek.users)
  workingDaysWeek: WorkingDaysWeek;

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.users)
  userLanguage: UserLanguage[];

  @OneToMany(() => TypesOfModeling, (typesOfModeling) => typesOfModeling.users)
  typesOfModeling: TypesOfModeling[];

  @ManyToMany(
    () => TypeOfEventCategoryItem,
    (typeOfEventCategoryItem) => typeOfEventCategoryItem.user,
  )
  typeOfEventCategoryItem: TypeOfEventCategoryItem;

  @OneToMany(() => Upload, (upload) => upload.users)
  uploadImages: Upload 

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, 10);
  }
}
