import { CreateBussInfoInput } from './create-buss_info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBussInfoInput extends PartialType(CreateBussInfoInput) {
  @Field(() => Int)
  id: number;
}
