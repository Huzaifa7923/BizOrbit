import { InputType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";
import { Field, } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { MinLength } from "class-validator";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field()
    @MinLength(6)
    password: string;

  @Field({nullable:true})
  @IsOptional()
  @MinLength(6)
  newPassword: string;
  
}
