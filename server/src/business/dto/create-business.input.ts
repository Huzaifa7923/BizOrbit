import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { isString } from 'lodash';

@InputType()
export class CreateBusinessInput {


  @Field()
  @IsNotEmpty()
  @IsString()
  business_name:string

  @Field()
  @IsOptional()
  gst_number:string

  @Field()
  @IsNotEmpty()
  pan_number:string

  @Field()
  @IsOptional()
  address:string

  @Field()
  @IsOptional()
  pin_code:string

}
