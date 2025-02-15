import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BussInfoService } from './buss_info.service';
import { BussInfo } from './entities/buss_info.entity';
import { CreateBussInfoInput } from './dto/create-buss_info.input';
import { UpdateBussInfoInput } from './dto/update-buss_info.input';

@Resolver(() => BussInfo)
export class BussInfoResolver {
  constructor(private readonly bussInfoService: BussInfoService) {}

  @Mutation(() => BussInfo)
  createBussInfo(@Args('createBussInfoInput') createBussInfoInput: CreateBussInfoInput) {
    return this.bussInfoService.create(createBussInfoInput);
  }

  @Query(() => [BussInfo], { name: 'bussInfo' })
  findAll() {
    return this.bussInfoService.findAll();
  }

  @Query(() => BussInfo, { name: 'bussInfo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bussInfoService.findOne(id);
  }

  @Mutation(() => BussInfo)
  updateBussInfo(@Args('updateBussInfoInput') updateBussInfoInput: UpdateBussInfoInput) {
    return this.bussInfoService.update(updateBussInfoInput.id, updateBussInfoInput);
  }

  @Mutation(() => BussInfo)
  removeBussInfo(@Args('id', { type: () => Int }) id: number) {
    return this.bussInfoService.remove(id);
  }
}
