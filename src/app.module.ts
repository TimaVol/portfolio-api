import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CrudModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
