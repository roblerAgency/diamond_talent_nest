import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

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

  async handleFileUpload({ file, userRequest }: { file: Express.Multer.File; userRequest: reqUser }) {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const { sub } = userRequest;
      const user = await this.usersService.getUserId({ id: sub });

      const fileUrl = `upload/${file.filename}`;

      const newFile = this.uploadRepository.create({
        filename: file.filename,
        url: fileUrl,
        users: user
      });

      await this.uploadRepository.save(newFile);

      return newFile;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
