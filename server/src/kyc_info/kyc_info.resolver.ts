import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KycInfoService } from './kyc_info.service';
import { KycInfo } from './entities/kyc_info.entity';
import { CreateKycInfoInput } from './dto/create-kyc_info.input';
import { UpdateKycInfoInput } from './dto/update-kyc_info.input';

@Resolver(() => KycInfo)
export class KycInfoResolver {
  constructor(private readonly kycInfoService: KycInfoService) {}

  @Mutation(() => KycInfo)
  createKycInfo(@Args('createKycInfoInput') createKycInfoInput: CreateKycInfoInput) {
    return this.kycInfoService.create(createKycInfoInput);
  }

  @Query(() => [KycInfo], { name: 'kycInfo' })
  findAll() {
    return this.kycInfoService.findAll();
  }

  @Query(() => KycInfo, { name: 'kycInfo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.kycInfoService.findOne(id);
  }

  @Mutation(() => KycInfo)
  updateKycInfo(@Args('updateKycInfoInput') updateKycInfoInput: UpdateKycInfoInput) {
    return this.kycInfoService.update(updateKycInfoInput.id, updateKycInfoInput);
  }

  @Mutation(() => KycInfo)
  removeKycInfo(@Args('id', { type: () => Int }) id: number) {
    return this.kycInfoService.remove(id);
  }
}
