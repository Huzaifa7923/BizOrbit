import { Injectable } from '@nestjs/common';
import { CreateKycInput } from './dto/create-kyc.input';
import { UpdateKycInput } from './dto/update-kyc.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Kyc } from './entities/kyc.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class KycService {

  constructor(
    @InjectRepository(Kyc) private kycRepository:Repository<Kyc>
  ){}

  async create(user:User,createKycInput: CreateKycInput) {
    const kyc=await this.kycRepository.save({...createKycInput,user});
    return kyc;
  }

  async findAll() {
    const kycs=await this.kycRepository.find();
    return kycs;
  }

  async updateMyKyc( updateKycInput: UpdateKycInput) {
    await this.kycRepository.update(updateKycInput.id,updateKycInput);
    return await this.kycRepository.findOne({where:{id:updateKycInput.id},relations:['user']});
  }


  findOne(id: number) {
    return `This action returns a #${id} kyc`;
  }

  update(id: number, updateKycInput: UpdateKycInput) {
    return `This action updates a #${id} kyc`;
  }

  remove(id: number) {
    return `This action removes a #${id} kyc`;
  }
}
