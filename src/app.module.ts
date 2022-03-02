import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './crud/crud.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.cwd()}/config/.env.development`,
        `${process.cwd()}/config/.env.prodaction`,
      ],
    }),
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    CrudModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
