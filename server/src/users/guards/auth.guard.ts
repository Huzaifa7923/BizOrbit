import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from '../users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  // Helper method to validate the token and fetch the user
  async validateToken(token: string): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const user = await this.usersService.verifyToken(token);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    let request;
    // console.log(request)
    if(context.getType()=="http"){
      request = context.switchToHttp().getRequest();
    }else{
      const ctx = GqlExecutionContext.create(context); // guard k paas direct accees nhi hota unlike resolvers
      request = ctx.getContext().req;
    }



    const token = request.cookies?.token; 
    console.log('Token from cookies:', token);

    if (!token) {
      throw new UnauthorizedException('No token found in cookies');
    }

    const user = await this.validateToken(token);
    console.log('User from token:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;
    return true;
  }
}