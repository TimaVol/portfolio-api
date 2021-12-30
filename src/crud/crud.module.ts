import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { Work } from './work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}
