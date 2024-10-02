import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// Entities
import { UploadEntity } from './entities/upload.entity';

// Commons
import { ErrorManager } from 'src/commons';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>,
  ) {}

  async handleFileUpload(file: Express.Multer.File) {
    try {
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
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
