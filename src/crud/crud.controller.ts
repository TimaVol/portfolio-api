import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CrudService } from './crud.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { Work } from './work.entity';

@Controller('crud')
export class CrudController {
  constructor(
    private readonly crudService: CrudService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createWorkDto: CreateWorkDto): Promise<Work> {
    return this.crudService.create(createWorkDto);
  }

  @Get()
  getAll(): Promise<Work[]> {
    return this.crudService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.crudService.remove(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
