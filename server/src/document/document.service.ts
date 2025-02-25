import { Injectable } from '@nestjs/common';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { User } from 'src/users/entities/user.entity';
import * as fs from 'fs';


@Injectable()
export class DocumentService {

  constructor(
    @InjectRepository(Document) 
    private documentRepository:Repository<Document> ,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  // createDocument(userId,fileUrl,docType);

  async uploadFileGql(userId: number, docType: string, file: FileUpload) {
    const { createReadStream, filename } = file;
    
    // Define the upload directory
    const uploadDir = join(__dirname, '../../uploads', `${userId}`, docType);

    // Ensure the directory exists
    fs.mkdirSync(uploadDir, { recursive: true });
    // Construct the file path (including timestamp to avoid overwriting)
    const fileName=`${Date.now()}-${filename}`;
    const filePath = join(uploadDir,fileName);
  
    console.log("inside service");
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Write the file to the server's file system
    await new Promise<void>((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => {
          console.log('File write completed');
          resolve();
        })
        .on('error', (error) => {
          console.error('File write error:', error);
          reject(error);
        })
    );
  
    console.log(user);
  
    // Save the document metadata in the database
    const document = this.documentRepository.create({
      user,
      docType,
      fileUrl: `http://localhost:3000/uploads/${user.id}/${docType}/${fileName}`, // Correct URL construction
    });
  
    // Save the document to the database
    await this.documentRepository.save(document);
  
    console.log(document);
    
    // Return the saved document
    return document;
  }

  //Rest controller service 
  async uploadFile(userId:number,fileUrl:string,docType:string){

    const document = await this.documentRepository.save({
      user: { id: userId }, // Link to user
      docType,
      fileUrl,
    });

    console.log(document)
    return document;
  }

  async findMyDocuments(userId){
    const documents=await this.documentRepository.find({
      where:{
        user:{
          id:userId
        }
      }
    })
    console.log(documents)
    return documents;
  }
  create(createDocumentInput: CreateDocumentInput) {
    console.log("xxxxx");
    console.log(createDocumentInput)
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
