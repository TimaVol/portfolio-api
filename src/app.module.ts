import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './crud/crud.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.cwd()}/config/.env.development`,
        `${process.cwd()}/config/.env.prodaction`,
      ],
    }),
    TypeOrmModule.forRoot(),
    CrudModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
