import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BusinessService {

  constructor(
    @InjectRepository(Business) private businessRepository:Repository<Business>,
    @InjectRepository(User) private userRepository:Repository<User>
){}

  async create(userId:number,createBusinessInput: CreateBusinessInput) {
    //{in user , either pass full object or the obj with id , can not pass id as a primitive value}
    const buss=await this.businessRepository.save({...createBusinessInput,user:{id:userId}});
    console.log(buss)
    return buss;
  }

  findAll() {
    return this.businessRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} business`;
  // }
  async updateBusiness(id: number, updateBusinessInput: UpdateBusinessInput) {
    const business=await this.businessRepository.findOne({where:{id}});
    
    if(!business)
      throw new NotFoundException("Business this with this id do not exist")

    const bussiness=await this.businessRepository.update(id,updateBusinessInput);
    return business;
  }

  async updateMyBusiness(id: number, userid:number, updateBusinessInput: UpdateBusinessInput) {

    console.log(id);
    console.log(userid)
    const business=await this.businessRepository.findOne({where:{id},relations:['user']});
    if(!business)
      throw new NotFoundException("Business this with this id do not exist")

    if(business?.user.id!=userid){
      throw new UnauthorizedException("Not authorised to delete others business");
    }

    const bussiness=await this.businessRepository.update(id,updateBusinessInput);
    return business;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
