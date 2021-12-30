import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { Work } from './work.entity';

@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

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
}
