import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { join } from 'path';
import * as path from 'path';
import { promises as fs } from 'fs';
import { existsSync, unlinkSync } from 'fs';

// Entities
import { Upload } from './entities/upload.entity';

// Services
import { UsersService } from '../users/users.service';

// Commons
import { ErrorManager, reqUser } from 'src/commons';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    private readonly usersService: UsersService,
  ) {}

  async handleFileUpload({
    file,
    userRequest,
    body,
  }: {
    file: Express.Multer.File;
    userRequest: reqUser;
    body: any;
  }) {
    try {
      if (!file) throw new Error('No file uploaded');

      const uploadDir = path.join(__dirname, '../../', 'upload'); 

      const { sub } = userRequest;
      const user = await this.usersService.getUserId({ id: sub });

      const fileUrl = `upload/${file.filename}`;

      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir);
      }

      const newFile = this.uploadRepository.create({
        filename: file.filename,
        url: fileUrl,
        typePicture: body.typePicture,
        users: user,
      });

      await this.uploadRepository.save(newFile);

      return newFile;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteFile({ filename }) {
    try {
      const file = await this.getFileByName({ filename });

      const fileUrl = join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'upload',
        filename,
      );

      if (!existsSync(fileUrl)) {
        throw new NotFoundException(`File ${filename} not found`);
      }

      if (file) {
        await this.uploadRepository.delete(file?.id);
      }

      unlinkSync(fileUrl);

      return file;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getFileByName({ filename }) {
    try {
      return this.uploadRepository.findOneBy({ filename });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
