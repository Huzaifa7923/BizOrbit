import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { KycService } from './kyc.service';
import { Kyc } from './entities/kyc.entity';
import { CreateKycInput } from './dto/create-kyc.input';
import { UpdateKycInput } from './dto/update-kyc.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/guards/auth.guard';

@Resolver(() => Kyc)
export class KycResolver {
  constructor(private readonly kycService: KycService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Kyc)
  createKyc(@Args('createKycInput') createKycInput: CreateKycInput,@Context() context ) {
    console.log(createKycInput)
    return this.kycService.create(context.req.user,createKycInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Kyc], { name: 'kyc' })
  findAll() {
    return this.kycService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(()=>[Kyc],{name:'myKyc'})
  findMyKyc(@Context() context){
    return this.kycService.findMyKyc(context.req.user.id);
  }

  @Query(() => Kyc, { name: 'kyc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.kycService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(()=>Kyc)
  updateMyKyc(@Args('updateKycInput') updateKycInput:UpdateKycInput){
    return this.kycService.updateMyKyc(updateKycInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Kyc)
  updateKyc(@Args('updateKycInput') updateKycInput: UpdateKycInput) {
    return this.kycService.update(updateKycInput.id, updateKycInput);
  }

  @Mutation(() => Kyc)
  removeKyc(@Args('id', { type: () => Int }) id: number) {
    return this.kycService.remove(id);
  }
}