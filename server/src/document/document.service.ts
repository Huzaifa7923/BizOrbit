import { Injectable } from '@nestjs/common';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) 
    private documentRepository:Repository<Document>
  ){}

  // createDocument(userId,fileUrl,docType);
  async uploadFile(userId:number,fileUrl:string,docType:string){

    const document = await this.documentRepository.save({
      user: { id: userId }, // Link to user
      docType,
      fileUrl,
    });

    console.log(document)
    return document;
  }

  create(createDocumentInput: CreateDocumentInput) {
    return 'This action adds a new document';
  }

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentInput: UpdateDocumentInput) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
