import { Injectable } from '@nestjs/common';
import { CreateBussInfoInput } from './dto/create-buss_info.input';
import { UpdateBussInfoInput } from './dto/update-buss_info.input';

@Injectable()
export class BussInfoService {
  create(createBussInfoInput: CreateBussInfoInput) {
    return 'This action adds a new bussInfo';
  }

  findAll() {
    return `This action returns all bussInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bussInfo`;
  }

  update(id: number, updateBussInfoInput: UpdateBussInfoInput) {
    return `This action updates a #${id} bussInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} bussInfo`;
  }
}
