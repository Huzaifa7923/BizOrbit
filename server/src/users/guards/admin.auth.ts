
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { UsersService } from '../users.service';


@Injectable()
export class AdminGuard implements CanActivate {

  canActivate(
    context: GqlExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx=GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.user && request.user.isAdmin;
  }
}
