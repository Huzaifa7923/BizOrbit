import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';
import { UpdateDocumentInput } from './dto/update-document.input';
import {  UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Document)
  async uploadDocument(
    @Args('docType') docType: string,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Context() context
  ): Promise<Document> {

    console.log(docType)
    console.log(file)
    return this.documentService.uploadFileGql(context.req.user.id, docType, file);
  }


  @UseGuards(AuthGuard)
  @Query(()=>[Document],{name:'myDocuments'})
  myDocuments(@Context() context){
    console.log("zzzzz");
    return this.documentService.findMyDocuments(context.req.user.id)
  }

  @Query(() => [Document], { name: 'document' })
  findAll() {
    return this.documentService.findAll();
  }

  @Query(() => Document, { name: 'document' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.documentService.findOne(id);
  }

  @Mutation(() => Document)
  updateDocument(@Args('updateDocumentInput') updateDocumentInput: UpdateDocumentInput) {
    return this.documentService.update(updateDocumentInput.id, updateDocumentInput);
  }

  @Mutation(() => Document)
  removeDocument(@Args('id', { type: () => Int }) id: number) {
    return this.documentService.remove(id);
  }
}
