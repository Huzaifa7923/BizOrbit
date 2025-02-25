import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFeatureInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
