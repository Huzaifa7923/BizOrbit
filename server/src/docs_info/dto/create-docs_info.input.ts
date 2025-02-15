import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDocsInfoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
