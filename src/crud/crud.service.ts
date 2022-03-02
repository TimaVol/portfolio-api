import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkDto } from './dto/create-work.dto';
import { Work } from './work.entity';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Work)
    private worksRepository: Repository<Work>,
  ) {}

  create(createWorkDto: CreateWorkDto, imgTitle: string): Promise<Work> {
    const work = new Work();
    work.title = createWorkDto.title;
    work.description = createWorkDto.description;
    work.link = createWorkDto.link;
    work.img = imgTitle;
    return this.worksRepository.save(work);
  }

  async findAll(): Promise<Work[]> {
    return this.worksRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.worksRepository.delete(id);
  }
}
