import { CreateBusinessInput } from './create-business.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBusinessInput extends PartialType(CreateBusinessInput) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
