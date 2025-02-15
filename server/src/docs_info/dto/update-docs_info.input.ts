import { CreateDocsInfoInput } from './create-docs_info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDocsInfoInput extends PartialType(CreateDocsInfoInput) {
  @Field(() => Int)
  id: number;
}
