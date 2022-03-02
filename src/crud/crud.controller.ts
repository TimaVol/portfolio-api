import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CrudService } from './crud.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { editFileName, imageFileFilter } from './utils/file-uploading.utils';
import { Work } from './work.entity';

@Controller('crud')
export class CrudController {
  constructor(
    private readonly crudService: CrudService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getAll(): Promise<Work[]> {
    return this.crudService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: path.resolve(__dirname, '..', 'static'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createWorkDto: CreateWorkDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Work> {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      file,
    };

    return this.crudService.create(createWorkDto, response.filename);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.crudService.remove(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
// @Get(':imgpath')
// seeUploadedFile(@Param('imgpath') image, @Res() res) {
//   return res.sendFile(image, { root: './files' });
// }
