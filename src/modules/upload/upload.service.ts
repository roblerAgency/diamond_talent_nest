import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// Entities
import { UploadEntity } from './entities/upload.enttity'

@Injectable()
export class UploadService {
	constructor(
		@InjectRepository(UploadEntity) private uploadRepository: Repository<UploadEntity>,
  ) {}

  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const fileUrl = `upload/${file.filename}`;

    const newFile = this.uploadRepository.create({
      filename: file.filename,
      url: fileUrl,
    });

    await this.uploadRepository.save(newFile);

    return {
      originalName: file.originalname,
      filename: file.filename,
      url: fileUrl,
    };
  }
}
