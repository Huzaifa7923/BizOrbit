import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBussInfoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
