import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-profile.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.auth';
import { SignInInput } from './dto/sign-in.input';
import { LoginResponse } from './dto/signIn-response';
import { Response } from 'express'; // Import Response from express


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => LoginResponse)
   async createUser(@Args('createUserInput') createUserInput: CreateUserInput, @Context() context) {
    const{token,user}=await this.usersService.create(createUserInput);

    context.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {token,user};
  }


  @UseGuards(AuthGuard,AdminGuard)
  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number
  ) {
    console.log(limit)
    return this.usersService.findAll({limit,offset});
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
  async myProfile(@Context() context) {
    const user= await this.usersService.findOne(context.req.user.id);
    return user;
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
