import { Injectable } from '@nestjs/common';
import { UpdateFeatureInput } from './dto/update-feature.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeaturesService {

  constructor(
    @InjectRepository(Feature) private featRepo:Repository<Feature>
  ){}

  async create(name: string) {
    const feat=await this.featRepo.save({name});
    return feat
  }

  async findAll() {
    const f=await this.featRepo.find();
    return f; 
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }

  update(id: number, updateFeatureInput: UpdateFeatureInput) {
    return `This action updates a #${id} feature`;
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
