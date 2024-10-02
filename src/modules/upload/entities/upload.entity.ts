import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'upload' })
export class UploadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: null })
  filename: string; 

  @Column({ type: 'text', default: null })
  url: string; 
}
