import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Commons
import { reqUser, ResponseInterceptor, ROLES } from 'src/commons';

// Jwt
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Services
import { UploadService } from './upload.service';

// Dtos
import { TypeUploadDto } from './dto';

@Controller('upload')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.USER)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(
    @UploadedFile() files: Express.Multer.File,
    @Body() body: TypeUploadDto, 
    @Req() request,
  ) {
    if (!files) {
      throw new BadRequestException('No file uploaded');
    }

    const userRequest: reqUser = request?.user;
    return this.uploadService.handleFileUpload({ file: files, userRequest, body });
  }

  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.USER)
  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    return this.uploadService.deleteFile({ filename })
  }
}
