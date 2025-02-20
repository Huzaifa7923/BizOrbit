import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { BusinessService } from './business.service';
import { Business } from './entities/business.entity';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { AdminGuard } from 'src/users/guards/admin.auth';


@Resolver(() => Business)
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}


  @Mutation(() => Business)
  @UseGuards(AuthGuard)
  createBusiness(@Args('createBusinessInput') createBusinessInput: CreateBusinessInput,@Context() context) {
    const userId=context.req.user.id;
    return this.businessService.create(userId,createBusinessInput);
  }

  @UseGuards(AuthGuard,AdminGuard)
  @Query(() => [Business], { name: 'business' })
  findAll() {
    return this.businessService.findAll();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Business)
  updateMyBusiness(@Args('updateBusinessInput') updateBusinessInput: UpdateBusinessInput,@Context() context ) {
    console.log(updateBusinessInput);
    return this.businessService.updateMyBusiness(updateBusinessInput.id, context.req.user.id, updateBusinessInput);
  }

  @UseGuards(AuthGuard,AdminGuard)
  @Mutation(() => Business)
  updateBusiness(@Args('updateBusinessInput') updateBusinessInput: UpdateBusinessInput) {
    console.log(updateBusinessInput);
    return this.businessService.updateBusiness(updateBusinessInput.id,updateBusinessInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Business], { name: 'myBusiness' })
  async myProfile(@Context() context) {
    console.log("z");
    const business= await this.businessService.findMyBusiness(context.req.user.id);
    console.log(business)
    return business;
  }

  @Mutation(() => Business)
  removeBusiness(@Args('id', { type: () => Int }) id: number) {
    return this.businessService.remove(id);
  }
}
