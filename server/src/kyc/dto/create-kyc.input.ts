import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateKycInput {

  @IsNotEmpty()
  @Field({nullable:true})
  aadhaarNumber: string;

  @IsNotEmpty()
  @Field({nullable:true})
  panNumber: string;
}
