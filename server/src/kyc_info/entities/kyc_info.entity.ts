import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class KycInfo {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
