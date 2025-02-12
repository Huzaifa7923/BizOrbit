import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { UsersService } from '../users.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private usersService: UsersService) {}

    async checkUser(request: Request) {
        const authHeader = request.headers.authorization;
        if(!authHeader){
            return false;
        }

        const token=authHeader.split(' ')[1];

        if(!token){
            return false;
        }
        const user=await this.usersService.verifyToken(token);
        return user;
    }

  async canActivate(
    context: GqlExecutionContext,
  ): Promise<boolean> {
    const ctx=GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    console.log("inside guard");
    const user=await this.checkUser(request);
    console.log(user)
    if(!user){
        return false;
    }
    request.user=user;
    return true;
  }
}
