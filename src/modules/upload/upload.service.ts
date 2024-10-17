import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
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
    private readonly httpService: HttpService,
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
      if (!file) throw new BadRequestException('No file uploaded');
      console.log({ file });

      const { sub } = userRequest;
      const user = await this.usersService.getUserId({ id: sub });

      const filePath = file.path; 

      const response = await lastValueFrom(
        this.httpService.post(
          'https://diamondtalentnest-production.up.railway.app/api/v1/upload',
          fs.createReadStream(filePath),
          {
            headers: {
              'Content-Type': file.mimetype,
              'Content-Disposition': `attachment; filename="${file.originalname}"`,
            },
          },
        ),
      );
      console.log({ response });

      const fileUrl = `https://vlakov.agency/api_images/${file.originalname}`;
      console.log({ fileUrl })

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
