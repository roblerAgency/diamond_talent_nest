import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseInterceptor } from 'src/commons';
import { FileInterceptor } from '@nestjs/platform-express';

// Jwt
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IsPublic } from 'src/auth/decorators/public.decorator';

// Services
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @IsPublic()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() files: Express.Multer.File) {
    return this.uploadService.handleFileUpload(files);
  }
}
