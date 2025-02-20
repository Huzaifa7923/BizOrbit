import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        console.log("_________________________________")
        console.log(data)
        return {
          status: true,
          message: 'Operation successful',
          data,
          statusCode: 200,
        };
      }),
    );
  }
}