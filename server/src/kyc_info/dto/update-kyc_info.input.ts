import { CreateKycInfoInput } from './create-kyc_info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateKycInfoInput extends PartialType(CreateKycInfoInput) {
  @Field(() => Int)
  id: number;
}
