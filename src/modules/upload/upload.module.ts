// Modules
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Controllers
import { UploadController } from './upload.controller';

// Services
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { UploadEntity } from './entities/upload.entity';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); 
        },
      }),
    }),

    TypeOrmModule.forFeature([UploadEntity])
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
