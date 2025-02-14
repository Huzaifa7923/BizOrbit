import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-profile.input';
import { Res, UseGuards } from '@nestjs/common';
import { Admin } from 'typeorm';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.auth';
import { SignInInput } from './dto/sign-in.input';
import { LoginResponse } from './dto/signIn-response';
import { Response } from 'express'; // Import Response from express
import { error } from 'console';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => LoginResponse)
   async createUser(@Args('createUserInput') createUserInput: CreateUserInput, @Context() context: { res: Response }) {
    const{token,user}=await this.usersService.create(createUserInput);

    context.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {token,user};
  }

  @UseGuards(AuthGuard,AdminGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    console.log("inside resolver");
    return this.usersService.findAll();
  }

  @Mutation(() => LoginResponse)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: { res: Response }, // Inject the response object
  ) {

    console.log("SIGNIN RESOLVER");
    const { token, user } = await this.usersService.signIn(signInInput);

    context.res.cookie('token', token, {
      httpOnly: true, // The cookie is not accessible via JavaScript
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return { token, user };
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  myProfile(@Context() context) {
    console.log("inside resolver");
    const user=context.req.user;
    console.log("isnide resolver",user);
    return this.usersService.findOne(user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(()=>User)
  updateMyProfile(@Args('updateUserInput') updateUserInput:UpdateUserInput,@Context() context){
    return this.usersService.updateProfile(context.req.user.id,updateUserInput)
  }


  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
