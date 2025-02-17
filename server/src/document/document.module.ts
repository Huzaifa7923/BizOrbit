import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Document } from './entities/document.entity';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { extname } from 'path';
import { DocumentsController } from './document.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Document]),
    UsersModule,
  ],
  providers: [DocumentResolver, DocumentService],
  controllers:[DocumentsController]
})
export class DocumentModule {}
