import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import axios from 'axios';

import * as FormData from 'form-data';
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

      const response = await axios.post(process.env.API_DIAMOND_TALENT_UPLOAD, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      });

      const { url, filename } = response?.data?.data;

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

  async deleteFile({
    filename,
    tokenRequest,
  }: {
    filename: string;
    tokenRequest: { token: string };
  }) {
    try {
      const file = await this.getFileByName({ filename });

      const response = await axios.delete(process.env.API_DIAMOND_TALENT_UPLOAD, {
        headers: {
          Authorization: `Bearer ${tokenRequest?.token}`,
        },
        data: { file: file?.filename },
      });

      if(response?.data) {
        const { data } = response?.data
        await this.uploadRepository.delete({ filename: data })
      }
      return file;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getFileByName({ filename }) {
    try {
      const file = await this.uploadRepository.findOneBy({ filename });

      if (!file) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `this file ${filename} was not found`,
        });
      }

      return file;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
