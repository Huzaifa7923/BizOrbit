import { Injectable } from '@nestjs/common';
import { CreateKycInfoInput } from './dto/create-kyc_info.input';
import { UpdateKycInfoInput } from './dto/update-kyc_info.input';

@Injectable()
export class KycInfoService {
  create(createKycInfoInput: CreateKycInfoInput) {
    return 'This action adds a new kycInfo';
  }

  findAll() {
    return `This action returns all kycInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kycInfo`;
  }

  update(id: number, updateKycInfoInput: UpdateKycInfoInput) {
    return `This action updates a #${id} kycInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} kycInfo`;
  }
}
