import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

// Commons
import { reqUser, ResponseInterceptor, ROLES } from 'src/commons';

// Jwt
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Services
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('download/:filename')
  download(@Param('filename') filename: string, @Res() res: Response) {
    const expressApiUrl = `${process.env.API_DIAMOND_TALENT_UPLOAD}/download/${filename}`;
    
    res.redirect(expressApiUrl);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.USER)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(
    @UploadedFile() files: Express.Multer.File,
    @Body() body: any,
    @Req() request,
  ) {
    if (!files) {
      throw new BadRequestException('No file uploaded');
    }

    const userRequest: { user: reqUser; token: string } = {
      user: request?.user,
      token: request?.headers?.authorization.split(' ')[1],
    };
    return this.uploadService.handleFileUpload({
      file: files,
      userRequest,
      body,
    });
  }

  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.USER)
  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string, @Req() request) {
    const tokenRequest: { token: string } = {
      token: request?.headers?.authorization.split(' ')[1],
    };

    return this.uploadService.deleteFile({ filename, tokenRequest });
  }
}
