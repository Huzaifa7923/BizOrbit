import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BussInfo {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
