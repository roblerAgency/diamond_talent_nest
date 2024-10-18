import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import axios from 'axios';

import * as FormData from 'form-data';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import * as fs from 'fs';

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
    userRequest: { user: reqUser; token: string };
    body: any;
  }) {
    try {
      if (!file) throw new BadRequestException('No file uploaded');
      const { user: userReq, token } = userRequest;

      const user = await this.usersService.getUserId({ id: userReq.sub });

      const formData = new FormData();
      const filePath = file.path;
      formData.append('file', fs.createReadStream(filePath), file.originalname);

      const response = await axios.post(
        'https://diamondtalentuploadapi-production.up.railway.app/upload',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { url, filename } = response?.data?.data;

      console.log({ url, filename })

      const newFile = this.uploadRepository.create({
        typePicture: body.typePicture,
        users: user,
        filename,
        url,
      });

      await this.uploadRepository.save(newFile);

      return file;
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
