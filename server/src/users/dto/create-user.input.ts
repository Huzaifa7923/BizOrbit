import { InputType, Field } from '@nestjs/graphql';
import { isEmail, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { defaultMaxListeners } from 'events';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  
  address?: string;
}

// business defaultMaxListeners
// address defaultMaxListeners
// kyc -> 