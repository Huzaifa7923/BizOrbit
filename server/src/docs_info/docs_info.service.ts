import { Injectable } from '@nestjs/common';
import { CreateDocsInfoInput } from './dto/create-docs_info.input';
import { UpdateDocsInfoInput } from './dto/update-docs_info.input';

@Injectable()
export class DocsInfoService {
  create(createDocsInfoInput: CreateDocsInfoInput) {
    return 'This action adds a new docsInfo';
  }

  findAll() {
    return `This action returns all docsInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} docsInfo`;
  }

  update(id: number, updateDocsInfoInput: UpdateDocsInfoInput) {
    return `This action updates a #${id} docsInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} docsInfo`;
  }
}
