import { isNull } from 'lodash';
import { CreateKycInput } from './create-kyc.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateKycInput extends PartialType(CreateKycInput) {

  @IsNotEmpty()
  @Field(() => Int)
  id: number;
}
