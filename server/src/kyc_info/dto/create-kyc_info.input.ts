import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateKycInfoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
