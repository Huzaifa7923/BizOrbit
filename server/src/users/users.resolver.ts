import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { Admin } from 'typeorm';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.auth';
import { SignInInput } from './dto/sign-in.input';
import { LoginResponse } from './dto/signIn-response';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
   createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(AuthGuard,AdminGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    console.log("inside resolver");
    return this.usersService.findAll();
  }

  @Mutation(() => LoginResponse)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.usersService.signIn(signInInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  myProfile(@Context() context) {
    const user=context.req.user;
    console.log("isnide resolver",user);
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    // return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
